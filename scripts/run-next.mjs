import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const [command, ...args] = process.argv.slice(2);

if (!['build', 'start'].includes(command)) {
  throw new Error('Gunakan: node scripts/run-next.mjs build|start');
}

const nextCli = resolve(process.cwd(), 'node_modules/next/dist/bin/next');
const defaultDistDir = process.env.VERCEL ? '.next' : '.next-build';
const child = spawn(process.execPath, [nextCli, command, ...args], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_DIST_DIR: process.env.NEXT_DIST_DIR || defaultDistDir },
});

child.on('error', (error) => {
  console.error(error);
  process.exitCode = 1;
});
child.on('exit', (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
