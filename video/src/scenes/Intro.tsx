import React from "react";
import { Blob, type Mood } from "../Blob";
import {
  Burst,
  C,
  GroundShadow,
  lerp,
  Pill,
  Place,
  pop,
  prog,
  RainCloud,
  StickerText,
  useSceneTime,
  Bg,
} from "../lib";

/** 0.0s – 3.1s  "Pernah gak kamu ngerasa? Makin kesini," */
export const HookScene: React.FC = () => {
  const t = useSceneTime(0);
  const s = pop(t, 0.05, 0.6);
  const bob = Math.sin(t * 4) * 10;
  const dart = Math.sin((t - 1.9) * 7) * prog(t, 1.9, 2.1);
  const mood: Mood = t < 1.9 ? "worried" : "suspicious";
  const marks = [
    { x: 290, y: 360, at: 0.4, c: C.mustard, r: -18 },
    { x: 540, y: 250, at: 0.75, c: C.coral, r: 6 },
    { x: 800, y: 350, at: 1.05, c: C.teal, r: 16 },
  ];
  return (
    <Bg color={C.bg}>
      <GroundShadow x={540} y={1130} w={360 * s} />
      <Place x={540} y={860 + bob} style={{ scale: s }}>
        <Blob
          color={C.purple}
          size={480}
          mood={mood}
          look={t < 1.9 ? 0.3 : dart}
          lookY={t < 1.9 ? -1 : 0}
          rightArm={150 + Math.sin(t * 14) * 12}
          leftArm={18}
        />
      </Place>
      {marks.map((m, i) => (
        <Place
          key={i}
          x={m.x}
          y={m.y + Math.sin(t * 3 + i) * 12}
          style={{
            scale: pop(t, m.at) * (1 - prog(t, 2.6, 3.0)),
            rotate: `${m.r + Math.sin(t * 3 + i) * 8}deg`,
          }}
        >
          <StickerText text="?" color={m.c} fontSize={210} />
        </Place>
      ))}
    </Bg>
  );
};

/** 3.1s – 9.0s  "kita makin gampang curiga dan sikut-sikutan sama orang yang
 * sebenarnya nasibnya sama persis kayak kita." */
export const SuspicionScene: React.FC = () => {
  const t = useSceneTime(3.1);
  const enter = prog(t, 3.1, 3.6);
  const fight = prog(t, 4.9, 5.15) - prog(t, 6.2, 6.5);
  const jitter = Math.sin(t * 40) * 14 * fight;
  const tealX = lerp(enter, -300, 330) + fight * 80 + jitter;
  const coralX = lerp(enter, 1380, 750) - fight * 80 - jitter;
  const mood: Mood =
    t < 4.2
      ? "neutral"
      : t < 4.9
        ? "suspicious"
        : t < 6.3
          ? "angry"
          : t < 6.9
            ? "surprised"
            : "sad";
  const lookSide = t >= 4.2 && t < 6.9 ? 1 : 0;
  const lookUp = t >= 6.9 ? -1 : 0;
  const elbow = lerp(fight, 12, 105);
  const sadSink = prog(t, 6.9, 7.4) * 20;
  return (
    <Bg color={C.bg}>
      <GroundShadow x={tealX} y={1030} w={300} />
      <GroundShadow x={coralX} y={1030} w={300} />
      <Place x={tealX} y={820 + sadSink + Math.sin(t * 5) * 6}>
        <Blob
          color={C.teal}
          size={380}
          mood={mood}
          look={lookSide}
          lookY={lookUp}
          rightArm={elbow}
          squash={sadSink / 200}
        />
      </Place>
      <Place x={coralX} y={820 + sadSink + Math.sin(t * 5 + 1) * 6}>
        <Blob
          color={C.coral}
          size={380}
          mood={mood}
          look={-lookSide}
          lookY={lookUp}
          leftArm={elbow}
          squash={sadSink / 200}
        />
      </Place>
      {[330, 750].map((x, i) => (
        <Place
          key={x}
          x={x + (i === 0 ? -40 : 40)}
          y={540}
          style={{
            scale: pop(t, 4.2 + i * 0.12, 0.35) * (1 - prog(t, 4.8, 4.95)),
            rotate: `${i === 0 ? -12 : 12}deg`,
          }}
        >
          <StickerText text="!?" color={C.mustard} fontSize={130} />
        </Place>
      ))}
      <Place
        x={540}
        y={700}
        style={{
          scale:
            pop(t, 4.95, 0.3) *
            (1 - prog(t, 6.2, 6.4)) *
            (1 + 0.12 * Math.sin(t * 30)),
        }}
      >
        <Burst size={300} text="BUK!" color={C.mustard} rotate={t * 40} />
      </Place>
      <Place x={540} y={420} style={{ scale: pop(t, 6.9, 0.5) }}>
        <RainCloud t={t} width={620} rain={prog(t, 7.1, 7.4)} />
      </Place>
      <Place x={540} y={1200} style={{ scale: pop(t, 7.4, 0.45) }}>
        <Pill text="NASIB SAMA PERSIS" color={C.mustard} fontSize={62} />
      </Place>
    </Bg>
  );
};
