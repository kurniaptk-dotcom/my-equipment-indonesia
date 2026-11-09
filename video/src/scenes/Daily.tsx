import React from "react";
import { Blob, type Mood } from "../Blob";
import {
  Bg,
  Burst,
  C,
  DizzyStars,
  GroundShadow,
  INK,
  lerp,
  Pill,
  Place,
  pop,
  prog,
  starPoints,
  StickerText,
  fontFamily,
  useSceneTime,
} from "../lib";

const Floor: React.FC<{ y: number; color?: string }> = ({ y, color = INK }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: y,
      height: 8,
      background: color,
      borderRadius: 4,
    }}
  />
);

/** 9.0s – 13.0s  "Di tempat kerja, saling jegal demi naikin posisi yang gak seberapa." */
export const WorkScene: React.FC = () => {
  const t = useSceneTime(9.0);
  const run = (a: number) => Math.abs(Math.sin(t * 14 + a)) * -28;
  // A: teal, gets tripped.
  const trip = prog(t, 10.6, 10.95);
  const aX = lerp(prog(t, 9.0, 10.4), 120, 470) + trip * 70;
  const aRun = t < 10.6 ? run(0) : 0;
  // B: coral, trips A, then grabs the tiny podium.
  const climb = prog(t, 11.55, 11.85);
  const bX = t < 11.0 ? lerp(prog(t, 9.0, 10.4), -120, 290) : lerp(prog(t, 11.0, 11.6), 290, 820);
  const bRun = t < 10.5 || (t > 11.0 && t < 11.6) ? run(1.3) : 0;
  const bY = 897 - climb * 80;
  const bMood: Mood = t < 10.4 ? "angry" : t < 11.8 ? "smug" : "happy";
  const bArms = t > 11.8 ? 160 : t > 10.45 && t < 11.0 ? 0 : 12;
  return (
    <Bg color="#E6F3FF">
      {[230, 540, 850].map((x, i) => (
        <div
          key={x}
          style={{
            position: "absolute",
            left: x - 120,
            top: 360,
            width: 240,
            height: 300,
            borderRadius: 28,
            border: `7px solid ${INK}`,
            background: "#CFE8FF",
            opacity: pop(t, 9.05 + i * 0.08),
          }}
        />
      ))}
      <Place x={540} y={210} style={{ scale: pop(t, 9.2) }}>
        <Pill text="DI TEMPAT KERJA" color={C.sky} fontSize={58} />
      </Place>
      <Floor y={1036} />
      {/* tiny podium */}
      <div
        style={{
          position: "absolute",
          left: 720,
          top: 958,
          width: 200,
          height: 82,
          background: C.mustard,
          border: `7px solid ${INK}`,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily,
          fontWeight: 700,
          fontSize: 40,
          color: INK,
        }}
      >
        1
      </div>
      <Place
        x={aX}
        y={897 + aRun + trip * 70}
        style={{ rotate: `${trip * 85}deg`, transformOrigin: "50% 100%" }}
      >
        <Blob
          color={C.teal}
          size={260}
          mood={t < 10.6 ? "angry" : t < 11.0 ? "surprised" : "sad"}
          look={1}
          tie={C.coral}
          leftArm={t > 10.6 && t < 11.2 ? 150 : 25}
          rightArm={t > 10.6 && t < 11.2 ? 150 : 25}
        />
      </Place>
      <Place x={aX + 40} y={760} style={{ opacity: prog(t, 11.0, 11.2) }}>
        <DizzyStars t={t} width={200} />
      </Place>
      <Place x={bX} y={bY + bRun}>
        <Blob
          color={C.coral}
          size={260}
          mood={bMood}
          look={1}
          tie={C.purple}
          leftArm={bArms}
          rightArm={t > 10.45 && t < 11.0 ? 110 : bArms}
        />
      </Place>
      {/* the "prize": a tiny star */}
      <Place x={820} y={bY - 175} style={{ scale: pop(t, 11.85, 0.4) }}>
        <svg width={70} height={70} viewBox="-40 -40 80 80">
          <polygon points={starPoints(5, 34, 15)} fill={C.mustard} stroke={INK} strokeWidth={5} />
        </svg>
      </Place>
      <Place
        x={560}
        y={760}
        style={{ scale: pop(t, 10.65, 0.3) * (1 - prog(t, 11.3, 11.5)) }}
      >
        <Burst size={280} text="JEGAL!" color={C.coral} rotate={-10} />
      </Place>
      <Place x={760} y={560} style={{ scale: pop(t, 12.1, 0.4), rotate: "-4deg" }}>
        <Pill text="CUMA SEGINI?" color={C.white} fontSize={56} />
      </Place>
    </Bg>
  );
};

/** 13.0s – 15.7s  "Di tongkrongan, cemas dibanding-bandingkan." */
export const HangoutScene: React.FC = () => {
  const t = useSceneTime(13.0);
  const shrink = prog(t, 14.6, 15.1);
  const bars = [
    { x: 270, h: 270, at: 14.6, c: C.teal },
    { x: 540, h: 80, at: 14.95, c: C.coral },
    { x: 810, h: 320, at: 14.75, c: C.purple },
  ];
  const blobs = [
    { x: 270, c: C.teal, at: 13.0 },
    { x: 540, c: C.coral, at: 13.1 },
    { x: 810, c: C.purple, at: 13.2 },
  ];
  return (
    <Bg color="#FFE9D6">
      <Place x={540} y={210} style={{ scale: pop(t, 13.2) }}>
        <Pill text="DI TONGKRONGAN" color={C.mustard} fontSize={58} />
      </Place>
      {/* bar comparison */}
      <div style={{ position: "absolute", left: 120, right: 120, top: 700, height: 8, background: INK, borderRadius: 4 }} />
      {bars.map((b) => {
        const g = pop(t, b.at, 0.5);
        return (
          <div
            key={b.x}
            style={{
              position: "absolute",
              left: b.x - 55,
              top: 704 - b.h * g,
              width: 110,
              height: b.h * g,
              background: b.c,
              border: `7px solid ${INK}`,
              borderRadius: "18px 18px 0 0",
              boxSizing: "border-box",
            }}
          />
        );
      })}
      {/* bench */}
      <div style={{ position: "absolute", left: 130, top: 1010, width: 820, height: 44, background: C.dirtDark, border: `7px solid ${INK}`, borderRadius: 14 }} />
      {[190, 870].map((x) => (
        <div key={x} style={{ position: "absolute", left: x, top: 1050, width: 24, height: 90, background: INK, borderRadius: 6 }} />
      ))}
      {blobs.map((b, i) => {
        const isMid = i === 1;
        const s = pop(t, b.at) * (isMid ? 1 - shrink * 0.2 : 1);
        const mood: Mood = isMid ? (t < 14.2 ? "neutral" : "worried") : t < 14.6 ? "happy" : "smug";
        return (
          <Place
            key={b.x}
            x={b.x}
            y={880 + (isMid ? shrink * 26 : Math.sin(t * 5 + i) * 6)}
            style={{ scale: s, transformOrigin: "50% 100%" }}
          >
            <Blob color={b.c} size={240} mood={mood} look={isMid ? Math.sin(t * 6) * 0.9 : i === 0 ? 1 : -1} />
          </Place>
        );
      })}
      {/* sweat drop */}
      <Place x={640} y={790 + prog(t, 14.3, 15.4) * 50} style={{ scale: pop(t, 14.25, 0.3) }}>
        <svg width={44} height={60} viewBox="0 0 44 60">
          <path d="M22 4 C30 20 40 30 40 40 A18 18 0 0 1 4 40 C4 30 14 20 22 4 Z" fill={C.sky} stroke={INK} strokeWidth={5} />
        </svg>
      </Place>
    </Bg>
  );
};

type Bubble = { side: "L" | "R"; at: number; text: string };
const BUBBLES: Bubble[] = [
  { side: "L", at: 16.3, text: "Menurutku A." },
  { side: "R", at: 16.75, text: "Salah! B dong" },
  { side: "L", at: 17.15, text: "#@%&!!" },
  { side: "R", at: 17.45, text: "!!$#@%" },
  { side: "L", at: 17.75, text: "DASAR...!!" },
  { side: "R", at: 18.05, text: "#@!! %$#" },
  { side: "L", at: 18.35, text: "$%#@!!!" },
  { side: "R", at: 18.65, text: "!!!" },
];

/** 15.7s – 19.7s  "Di media sosial, saling hujat cuma gara-gara beda sudut pandang." */
export const SocialScene: React.FC = () => {
  const t = useSceneTime(15.7);
  const shake = prog(t, 17.1, 17.3) * (1 - prog(t, 19.2, 19.5));
  const shown = BUBBLES.filter((b) => t >= b.at).length;
  const scroll = BUBBLES.reduce((acc, b, i) => acc + (i >= 5 ? prog(t, b.at, b.at + 0.25) * 132 : 0), 0);
  return (
    <Bg color="#EDE8FF">
      <Place x={540} y={190} style={{ scale: pop(t, 15.9) }}>
        <Pill text="DI MEDIA SOSIAL" color={C.pink} fontSize={58} />
      </Place>
      <Place
        x={540}
        y={760}
        style={{
          scale: pop(t, 15.75, 0.5),
          rotate: `${Math.sin(t * 34) * 2.2 * shake}deg`,
        }}
      >
        <div
          style={{
            width: 580,
            height: 920,
            borderRadius: 70,
            border: `12px solid ${INK}`,
            background: C.white,
            overflow: "hidden",
            position: "relative",
            boxShadow: `0 16px 0 ${INK}`,
          }}
        >
          <div style={{ height: 90, background: C.purple, borderBottom: `7px solid ${INK}` }} />
          <div style={{ position: "absolute", top: 120, left: 0, right: 0, translate: `0 ${-scroll}px` }}>
            {BUBBLES.slice(0, Math.max(shown, 0)).map((b, i) => {
              const angry = i >= 2;
              const isL = b.side === "L";
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: isL ? "row" : "row-reverse",
                    alignItems: "center",
                    gap: 14,
                    padding: "0 26px",
                    height: 118,
                    marginBottom: 14,
                    scale: pop(t, b.at, 0.3),
                    transformOrigin: isL ? "0% 50%" : "100% 50%",
                  }}
                >
                  <Blob color={isL ? C.purple : C.teal} size={88} mood={angry ? "angry" : "neutral"} look={isL ? 1 : -1} />
                  <div
                    style={{
                      fontFamily,
                      fontWeight: 700,
                      fontSize: 40,
                      padding: "18px 26px",
                      borderRadius: 30,
                      border: `6px solid ${INK}`,
                      background: angry ? (isL ? "#FFD3CE" : "#FFE7A8") : "#F1EEFF",
                      color: angry ? C.red : INK,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Place>
      <Place x={380} y={1320} style={{ scale: pop(t, 18.3, 0.4) }}>
        <Pill text="A" color={C.purple} textColor={C.white} fontSize={70} />
      </Place>
      <Place x={540} y={1320} style={{ scale: pop(t, 18.45, 0.4), rotate: `${Math.sin(t * 20) * 8}deg` }}>
        <StickerText text="⚡" color={C.mustard} fontSize={90} />
      </Place>
      <Place x={700} y={1320} style={{ scale: pop(t, 18.6, 0.4) }}>
        <Pill text="B" color={C.teal} textColor={C.white} fontSize={70} />
      </Place>
    </Bg>
  );
};

/** 19.7s – 25.0s  "Kita dipaksa percaya, kalau orang di sebelah kita adalah saingan
 * yang harus dikalahkan." */
export const RivalScene: React.FC = () => {
  const t = useSceneTime(19.7);
  const lock = prog(t, 23.0, 23.45);
  const rage = t >= 23.8;
  const tealMood: Mood = t < 20.0 ? "neutral" : t < 21.8 ? "worried" : t < 23.0 ? "suspicious" : rage ? "angry" : "suspicious";
  return (
    <Bg color={C.bg}>
      {/* megaphone */}
      <Place x={230} y={330} style={{ scale: pop(t, 19.9), rotate: "28deg" }}>
        <svg width={300} height={220} viewBox="0 0 300 220" style={{ overflow: "visible" }}>
          {[0, 1, 2].map((i) => {
            const k = ((t * 1.6 + i / 3) % 1);
            return (
              <path
                key={i}
                d={`M${250 + k * 90} ${110 - 60 - k * 50} Q${290 + k * 110} 110 ${250 + k * 90} ${110 + 60 + k * 50}`}
                stroke={INK}
                strokeWidth={10}
                strokeLinecap="round"
                fill="none"
                opacity={(1 - k) * (t < 23.0 ? 1 : 1 - prog(t, 23.0, 23.3))}
              />
            );
          })}
          <rect x={20} y={80} width={70} height={60} rx={10} fill={C.red} stroke={INK} strokeWidth={8} />
          <polygon points="88,82 240,20 240,200 88,138" fill={C.mustard} stroke={INK} strokeWidth={8} strokeLinejoin="round" />
          <rect x={50} y={136} width={26} height={60} rx={8} fill={INK} />
        </svg>
      </Place>
      <GroundShadow x={330} y={1080} w={300} />
      <Place
        x={330 + (rage ? Math.sin(t * 40) * 8 : 0)}
        y={880}
        style={{ scale: pop(t, 19.7) }}
      >
        <Blob
          color={C.teal}
          size={360}
          mood={tealMood}
          look={t < 21.8 ? -1 : 1}
          lookY={t < 21.8 ? -1 : 0}
          leftArm={rage ? 155 : 15}
          rightArm={rage ? 155 : 15}
        />
      </Place>
      <GroundShadow x={760} y={1080} w={300 * pop(t, 21.8)} />
      <Place x={760} y={880} style={{ scale: pop(t, 21.8) }}>
        <Blob
          color={C.coral}
          size={360}
          mood={t < 23.0 ? "happy" : "worried"}
          look={-1}
          rightArm={t < 23.0 ? 150 + Math.sin(t * 12) * 15 : 15}
        />
      </Place>
      {/* target reticle */}
      <Place
        x={760}
        y={870}
        style={{
          opacity: lock,
          scale: lerp(lock, 2.4, 1),
          rotate: `${lerp(lock, 90, 0) + Math.sin(t * 4) * 4}deg`,
        }}
      >
        <svg width={420} height={420} viewBox="-210 -210 420 420">
          <circle r={180} fill="none" stroke={C.red} strokeWidth={12} strokeDasharray="40 22" />
          <circle r={110} fill="none" stroke={C.red} strokeWidth={8} />
          {[0, 90, 180, 270].map((a) => (
            <line key={a} x1={0} y1={-200} x2={0} y2={-130} stroke={C.red} strokeWidth={12} strokeLinecap="round" transform={`rotate(${a})`} />
          ))}
        </svg>
      </Place>
      <Place x={760} y={560} style={{ scale: pop(t, 23.05, 0.4), rotate: "5deg" }}>
        <Pill text="SAINGAN?" color={C.red} textColor={C.white} fontSize={64} />
      </Place>
      <Place x={545} y={640} style={{ scale: pop(t, 23.8, 0.4), rotate: "-8deg" }}>
        <StickerText text="VS" color={C.mustard} fontSize={150} />
      </Place>
    </Bg>
  );
};
