import { useEffect, useRef } from 'react';

// Swap these for real photos (drop files in /public/intro and update the paths).
const IMAGES = [
  '/intro/t1.svg',
  '/intro/t2.svg',
  '/intro/t3.svg',
  '/intro/t4.svg',
  '/intro/t5.svg',
  '/intro/t6.svg',
  '/intro/t7.svg',
  '/intro/t8.svg',
];

type Depth = 'far' | 'mid' | 'near';
type Vis = 'mobile' | 'tablet' | 'desktop'; // minimum breakpoint at which the tile shows

type Tile = {
  x: number; // % left  (50 = centre)
  y: number; // % top   (50 = centre)
  w: number; // px width
  img: number;
  depth: Depth;
  o: number; // base opacity
  rot: number; // max rotation (deg) reached at full inward
  vis: Vis;
};

// Distance / styling per depth tier. Near images are larger, sharper, move more,
// and sit on top; far images are small, faint, blurred, and barely move.
const DEPTH: Record<Depth, { in: number; out: number; blur: number; z: number }> = {
  far: { in: 42, out: 58, blur: 1.4, z: 1 },
  mid: { in: 84, out: 104, blur: 0, z: 3 },
  near: { in: 140, out: 168, blur: 0, z: 5 },
};
