import { registerMediabunnyServer } from "@mediabunny/server";
import {
  WHISPER_WEBGPU_SAMPLE_RATE,
  canUseWhisperWebGpu,
  downloadWhisperModel,
  loadWhisperModel,
  toCaptions,
  transcribe,
} from "@remotion/whisper-webgpu";
import {
  ALL_FORMATS,
  Conversion,
  FilePathSource,
  Input,
  NullTarget,
  Output,
  WavOutputFormat,
} from "mediabunny";
import { writeFile } from "node:fs/promises";

registerMediabunnyServer();

const file = process.argv[2] ?? "public/voiceover.mp3";
const out = process.argv[3] ?? "src/voiceover-captions.json";
const language = process.argv[4] ?? "indonesian";
const model = process.argv[5] ?? "small";

const support = await canUseWhisperWebGpu();
if (!support.supported) {
  throw new Error(support.detailedReason);
}

const chunks = [];
const input = new Input({ formats: ALL_FORMATS, source: new FilePathSource(file) });
const audioTrack = await input.getPrimaryAudioTrack();
if (audioTrack === null) throw new Error("No audio track");

const conversion = await Conversion.init({
  input,
  output: new Output({ format: new WavOutputFormat(), target: new NullTarget() }),
  video: { discard: true },
  audio: (track) => {
    if (track.id !== audioTrack.id) return { discard: true };
    return {
      codec: "pcm-f32",
      forceTranscode: true,
      numberOfChannels: 1,
      sampleFormat: "f32",
      sampleRate: WHISPER_WEBGPU_SAMPLE_RATE,
      process: (sample) => {
        const waveform = new Float32Array(
          sample.allocationSize({ format: "f32", planeIndex: 0 }) /
            Float32Array.BYTES_PER_ELEMENT,
        );
        sample.copyTo(waveform, { format: "f32", planeIndex: 0 });
        chunks.push({
          startFrame: Math.round(sample.timestamp * WHISPER_WEBGPU_SAMPLE_RATE),
          waveform,
        });
        return sample;
      },
    };
  },
});
if (!conversion.isValid) throw new Error("Cannot decode audio");
await conversion.execute();

const len = chunks.reduce((m, c) => Math.max(m, c.startFrame + c.waveform.length), 0);
const channelWaveform = new Float32Array(len);
for (const c of chunks) {
  const d = Math.max(0, c.startFrame);
  const s = Math.max(0, -c.startFrame);
  const n = Math.min(c.waveform.length - s, channelWaveform.length - d);
  if (n > 0) channelWaveform.set(c.waveform.subarray(s, s + n), d);
}

console.log("Downloading model", model);
await downloadWhisperModel({ model });
const handle = await loadWhisperModel({ model });
const transcription = await transcribe({ channelWaveform, model, language });
const { captions } = toCaptions({ whisperWebGpuOutput: transcription });
await writeFile(out, JSON.stringify(captions, null, 2));
console.log("TEXT:", transcription.text);
await handle[Symbol.asyncDispose]?.();
process.exit(0);
