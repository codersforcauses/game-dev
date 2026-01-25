import React from "react";

type Debris = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  life: number; // ms remaining
  maxLife: number; // ms
};

type Props = {
  x: number; // crater center (px)
  y: number; // crater center (px)
  count?: number;
  power?: number; // launch velocity scale
  spreadDeg?: number; // 360 = all directions, 180 = forward semicircle, etc
  gravity?: number; // px/s^2
  groundY?: number; // optional "ground" to bounce on (absolute px)
  bounce?: number; // 0..1
  onDone?: () => void;
};

export function DebrisBurst({
  x,
  y,
  count = 22,
  power = 520,
  spreadDeg = 360,
  gravity = 1400,
  groundY,
  bounce = 0.35,
  onDone,
}: Props) {
  return null;
}

