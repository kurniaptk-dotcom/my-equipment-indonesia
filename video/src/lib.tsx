import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Fredoka";

export const { fontFamily } = loadFont("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
});

export const C = {
  bg: "#FFF4E4",
  ink: "#1F1A2E",
  coral: "#FF6B5B",
  mustard: "#FFC145",
  teal: "#2EC4B6",
  purple: "#7B61FF",
  pink: "#FF8FB1",
  sky: "#8FD3FF",
  red: "#E63946",
  green: "#5BC77A",
  night: "#2A2340",
  dirt: "#C98B5A",
  dirtDark: "#8A5A3B",
  pit: "#4A2F23",
  white: "#FFFFFF",
  cream: "#F4F1EA",
};
export const INK = C.ink;

export const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const BACK = Easing.bezier(0.34, 1.7, 0.5, 1);

/** Absolute voiceover time (seconds) inside a scene that starts at `start`. */
export const useSceneTime = (start: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps + start;
};

/** 0 → 1 between absolute seconds a and b. */
export const prog = (t: number, a: number, b: number, easing = EASE) =>
  interpolate(t, [a, b], [0, 1], { ...CLAMP, easing });

/** Overshooting pop-in starting at absolute second a. */
export const pop = (t: number, a: number, dur = 0.45) =>
  interpolate(t, [a, a + dur], [0, 1], { ...CLAMP, easing: BACK });

export const lerp = (v: number, a: number, b: number) => a + (b - a) * v;

export const Bg: React.FC<{
  color: string;
  dots?: string;
  children?: React.ReactNode;
}> = ({ color, dots = "rgba(31,26,46,0.06)", children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        backgroundImage: `radial-gradient(${dots} 4px, transparent 5px)`,
        backgroundSize: "60px 60px",
        backgroundPosition: `${frame * 0.4}px ${frame * 0.6}px`,
        overflow: "hidden",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** Centers its children on (x, y). */
export const Place: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ x, y, children, style }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      translate: "-50% -50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Pill: React.FC<{
  text: string;
  color: string;
  textColor?: string;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({ text, color, textColor = INK, fontSize = 56, style }) => (
  <div
    style={{
      fontFamily,
      fontWeight: 700,
      fontSize,
      color: textColor,
      background: color,
      border: `7px solid ${INK}`,
      borderRadius: 999,
      padding: `${fontSize * 0.22}px ${fontSize * 0.6}px`,
      boxShadow: `0 10px 0 ${INK}`,
      whiteSpace: "nowrap",
      letterSpacing: 1,
      lineHeight: 1.1,
      ...style,
    }}
  >
    {text}
  </div>
);

/** Big outlined sticker text. */
export const StickerText: React.FC<{
  text: string;
  color: string;
  fontSize: number;
  style?: React.CSSProperties;
}> = ({ text, color, fontSize, style }) => (
  <div
    style={{
      fontFamily,
      fontWeight: 700,
      fontSize,
      color,
      WebkitTextStroke: `${fontSize * 0.09}px ${INK}`,
      paintOrder: "stroke fill",
      lineHeight: 1,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {text}
  </div>
);

export const starPoints = (n: number, outer: number, inner: number) => {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / n - Math.PI / 2;
    pts.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`);
  }
  return pts.join(" ");
};

/** Comic impact burst with a word inside. */
export const Burst: React.FC<{
  size: number;
  text?: string;
  color?: string;
  rotate?: number;
}> = ({ size, text, color = C.mustard, rotate = 0 }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <svg
      width={size}
      height={size}
      viewBox="-120 -120 240 240"
      style={{ position: "absolute", inset: 0, rotate: `${rotate}deg` }}
    >
      <polygon
        points={starPoints(10, 112, 70)}
        fill={color}
        stroke={INK}
        strokeWidth={8}
        strokeLinejoin="round"
      />
    </svg>
    {text ? (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StickerText text={text} color={C.white} fontSize={size * 0.22} />
      </div>
    ) : null}
  </div>
);

/** A jittering cartoon fight cloud. */
export const FightCloud: React.FC<{ t: number; size: number }> = ({
  t,
  size,
}) => {
  const circles: [number, number, number][] = [
    [0, 0, 70],
    [-72, 12, 55],
    [72, 16, 58],
    [-36, -48, 52],
    [42, -46, 54],
    [0, 48, 52],
  ];
  const jx = (i: number) => Math.sin(t * 26 + i * 1.7) * 7;
  const jy = (i: number) => Math.cos(t * 23 + i * 2.3) * 7;
  return (
    <svg
      width={size}
      height={size}
      viewBox="-160 -160 320 320"
      style={{ overflow: "visible" }}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const a = t * 5 + i * 1.3;
        return (
          <line
            key={`l${i}`}
            x1={Math.cos(a) * 60}
            y1={Math.sin(a) * 60}
            x2={Math.cos(a) * 135}
            y2={Math.sin(a) * 135}
            stroke={INK}
            strokeWidth={14}
            strokeLinecap="round"
          />
        );
      })}
      {circles.map(([x, y, r], i) => (
        <circle key={`o${i}`} cx={x + jx(i)} cy={y + jy(i)} r={r + 8} fill={INK} />
      ))}
      {circles.map(([x, y, r], i) => (
        <circle key={`f${i}`} cx={x + jx(i)} cy={y + jy(i)} r={r} fill={C.cream} />
      ))}
      {[0, 1, 2].map((i) => {
        const a = t * 7 + i * 2.1;
        return (
          <polygon
            key={`s${i}`}
            points={starPoints(5, 22, 10)}
            transform={`translate(${Math.cos(a) * 45} ${Math.sin(a) * 35}) rotate(${t * 300 + i * 40})`}
            fill={C.mustard}
            stroke={INK}
            strokeWidth={4}
          />
        );
      })}
    </svg>
  );
};

/** Little spinning stars over a dizzy head. */
export const DizzyStars: React.FC<{ t: number; width: number }> = ({
  t,
  width,
}) => (
  <svg width={width} height={width * 0.4} viewBox="-100 -40 200 80" style={{ overflow: "visible" }}>
    {[0, 1, 2].map((i) => {
      const a = t * 6 + (i * Math.PI * 2) / 3;
      return (
        <polygon
          key={i}
          points={starPoints(5, 16, 7)}
          transform={`translate(${Math.cos(a) * 80} ${Math.sin(a) * 22})`}
          fill={C.mustard}
          stroke={INK}
          strokeWidth={4}
        />
      );
    })}
  </svg>
);

export const RainCloud: React.FC<{ t: number; width: number; rain: number }> = ({
  t,
  width,
  rain,
}) => {
  const circles: [number, number, number][] = [
    [120, 130, 60],
    [200, 95, 80],
    [285, 125, 62],
    [160, 170, 50],
    [250, 170, 50],
  ];
  return (
    <svg width={width} height={width * 0.9} viewBox="0 0 400 360" style={{ overflow: "visible" }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 210 + ((t * 420 + i * 53) % 150);
        return (
          <line
            key={i}
            x1={95 + i * 19}
            y1={y}
            x2={90 + i * 19}
            y2={y + 26}
            stroke={C.sky}
            strokeWidth={8}
            strokeLinecap="round"
            opacity={rain}
          />
        );
      })}
      {circles.map(([x, y, r], i) => (
        <circle key={`o${i}`} cx={x} cy={y} r={r + 8} fill={INK} />
      ))}
      <rect x={110} y={140} width={180} height={88} rx={44} fill={INK} />
      {circles.map(([x, y, r], i) => (
        <circle key={`f${i}`} cx={x} cy={y} r={r} fill="#B8B2C8" />
      ))}
      <rect x={118} y={140} width={164} height={80} rx={40} fill="#B8B2C8" />
    </svg>
  );
};

export const GroundShadow: React.FC<{ x: number; y: number; w: number }> = ({
  x,
  y,
  w,
}) => (
  <div
    style={{
      position: "absolute",
      left: x - w / 2,
      top: y - w * 0.07,
      width: w,
      height: w * 0.14,
      borderRadius: "50%",
      background: "rgba(31,26,46,0.14)",
    }}
  />
);
