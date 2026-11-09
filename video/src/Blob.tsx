import React from "react";
import { C, INK } from "./lib";

export type Mood =
  | "neutral"
  | "happy"
  | "angry"
  | "sad"
  | "suspicious"
  | "worried"
  | "surprised"
  | "tired"
  | "smug";

type Props = {
  readonly color: string;
  readonly size?: number;
  readonly mood?: Mood;
  /** -1 (left) … 1 (right) */
  readonly look?: number;
  /** -1 (up) … 1 (down) */
  readonly lookY?: number;
  /** 0 open … 1 closed */
  readonly blink?: number;
  /** Arm angles in degrees. 0 = hanging down, 90 = sideways, 170 = up. */
  readonly leftArm?: number;
  readonly rightArm?: number;
  readonly tie?: string;
  readonly squash?: number;
  readonly outline?: string;
  readonly style?: React.CSSProperties;
};

const BODY =
  "M100 22 C160 22 186 72 186 132 C186 186 152 206 100 206 C48 206 14 186 14 132 C14 72 40 22 100 22 Z";

const brows: Partial<Record<Mood, string[]>> = {
  angry: ["M50 80 L90 96", "M150 80 L110 96"],
  worried: ["M52 92 L88 80", "M148 92 L112 80"],
  sad: ["M52 92 L88 82", "M148 92 L112 82"],
  suspicious: ["M52 82 L90 86", "M110 92 L148 92"],
  surprised: ["M54 80 Q72 66 90 80", "M110 80 Q128 66 146 80"],
  smug: ["M52 88 L90 84", "M110 84 L148 88"],
};

const Mouth: React.FC<{ mood: Mood }> = ({ mood }) => {
  const s = { stroke: INK, strokeWidth: 6, strokeLinecap: "round" as const, fill: "none" };
  switch (mood) {
    case "happy":
      return <path d="M76 144 Q100 182 124 144 Q100 154 76 144 Z" fill={INK} stroke={INK} strokeWidth={4} strokeLinejoin="round" />;
    case "angry":
      return <path d="M80 164 Q100 144 120 164" {...s} />;
    case "sad":
      return <path d="M84 164 Q100 150 116 164" {...s} />;
    case "worried":
      return <path d="M80 158 Q90 150 100 158 Q110 166 120 158" {...s} />;
    case "surprised":
      return <ellipse cx={100} cy={158} rx={11} ry={14} fill={INK} />;
    case "suspicious":
      return <path d="M86 158 L116 152" {...s} />;
    case "tired":
      return <path d="M86 160 Q100 155 114 160" {...s} />;
    case "smug":
      return <path d="M82 150 Q104 166 122 146" {...s} />;
    default:
      return <path d="M86 152 Q100 158 114 152" {...s} />;
  }
};

export const Blob: React.FC<Props> = ({
  color,
  size = 300,
  mood = "neutral",
  look = 0,
  lookY = 0,
  blink = 0,
  leftArm = 12,
  rightArm = 12,
  tie,
  squash = 0,
  outline = INK,
  style,
}) => {
  const px = look * 7;
  const py = lookY * 7;
  const eyeScale = 1 - blink * 0.92;
  const lids = mood === "suspicious" || mood === "tired" || mood === "smug";
  const Arm: React.FC<{ x: number; angle: number }> = ({ x, angle }) => (
    <g transform={`translate(${x} 134) rotate(${angle})`}>
      <line x1={0} y1={0} x2={0} y2={46} stroke={outline} strokeWidth={13} strokeLinecap="round" />
      <circle cx={0} cy={50} r={11} fill={color} stroke={outline} strokeWidth={6} />
    </g>
  );
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      style={{ overflow: "visible", ...style }}
    >
      <g transform={`translate(100 206) scale(${1 + squash} ${1 - squash}) translate(-100 -206)`}>
        <ellipse cx={74} cy={206} rx={20} ry={9} fill={outline} />
        <ellipse cx={126} cy={206} rx={20} ry={9} fill={outline} />
        <Arm x={30} angle={leftArm} />
        <Arm x={170} angle={-rightArm} />
        <path d={BODY} fill={color} stroke={outline} strokeWidth={7} strokeLinejoin="round" />
        <ellipse cx={62} cy={62} rx={20} ry={11} fill="#FFFFFF" opacity={0.35} transform="rotate(-30 62 62)" />
        {tie ? (
          <path d="M92 172 L108 172 L104 182 L111 200 L100 210 L89 200 L96 182 Z" fill={tie} stroke={outline} strokeWidth={4} strokeLinejoin="round" />
        ) : null}
        {mood === "happy" || mood === "smug" ? (
          <>
            <circle cx={50} cy={140} r={11} fill={C.pink} opacity={0.7} />
            <circle cx={150} cy={140} r={11} fill={C.pink} opacity={0.7} />
          </>
        ) : null}
        <g transform={`translate(0 112) scale(1 ${eyeScale}) translate(0 -112)`}>
          {[72, 128].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy={112} r={19} fill="#FFFFFF" stroke={outline} strokeWidth={5} />
              <circle cx={cx + px} cy={114 + py} r={9} fill={INK} />
              <circle cx={cx + px + 3} cy={110 + py} r={3} fill="#FFFFFF" />
              {lids ? (
                <path
                  d={`M${cx - 21} ${mood === "tired" ? 116 : 112} A21 21 0 0 1 ${cx + 21} ${mood === "tired" ? 116 : 112} Z`}
                  fill={color}
                  stroke={outline}
                  strokeWidth={5}
                  strokeLinejoin="round"
                />
              ) : null}
            </g>
          ))}
        </g>
        {(brows[mood] ?? []).map((d) => (
          <path key={d} d={d} stroke={outline} strokeWidth={7} strokeLinecap="round" fill="none" />
        ))}
        <Mouth mood={mood} />
      </g>
    </svg>
  );
};
