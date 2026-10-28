import { spawn } from 'node:child_process';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

async function findAvailablePort() {
  const probe = createServer();
  await new Promise((resolve, reject) => {
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', resolve);
  });
  const address = probe.address();
  if (!address || typeof address === 'string') throw new Error('Tidak dapat menentukan port E2E.');
  await new Promise((resolve, reject) => probe.close((error) => error ? reject(error) : resolve()));
  return address.port;
}

const port = await findAvailablePort();
const baseURL = `http://127.0.0.1:${port}`;
const env = {
  ...process.env,
  USE_LOCAL_SEED_CONTENT: process.env.E2E_USE_DATABASE === 'true' ? 'false' : 'true',
  SITE_URL: 'https://www.myequipmentindonesia.com',
  AUTH_URL: baseURL,
  CMS_PUBLIC_URL: baseURL,
  E2E_BASE_URL: baseURL,
  NEXT_DIST_DIR: '.next-e2e',
};

const server = spawn(process.execPath, [
  'node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', String(port),
], { env, stdio: 'inherit', windowsHide: true });

function waitForServerExit(timeoutMs = 5000) {
  if (server.exitCode !== null || server.signalCode !== null) return Promise.resolve();
  return Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    delay(timeoutMs),
  ]);
}

async function stopServer() {
  if (server.exitCode !== null || server.signalCode !== null) return;
  if (process.platform === 'win32' && server.pid) {
    const killer = spawn('taskkill.exe', ['/pid', String(server.pid), '/t', '/f'], { stdio: 'ignore', windowsHide: true });
    await Promise.race([
      new Promise((resolve) => killer.once('close', resolve)),
      delay(5000),
    ]);
  } else {
    server.kill('SIGTERM');
  }
  await waitForServerExit();
  if (server.exitCode === null && server.signalCode === null) {
    server.kill('SIGTERM');
    await waitForServerExit(2000);
  }
}

async function waitForServer() {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Next.js test server exited with code ${server.exitCode}`);
    try {
      const response = await fetch(`${baseURL}/produk`, { signal: AbortSignal.timeout(2500) });
      if (response.status < 500) return;
    } catch {}
    await delay(500);
  }
  throw new Error('Next.js test server was not ready within 120 seconds.');
}

let testExitCode = 1;
try {
  await waitForServer();
  const runner = spawn(process.execPath, ['node_modules/playwright/cli.js', 'test', ...process.argv.slice(2)], {
    env,
    stdio: 'inherit',
    windowsHide: true,
  });
  testExitCode = await new Promise((resolve, reject) => {
    runner.once('error', reject);
    runner.once('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)));
  });
} catch (error) {
  console.error(error);
} finally {
  await stopServer();
}

process.exitCode = testExitCode;
