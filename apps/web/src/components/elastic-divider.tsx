'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

// Reference geometry: a single quadratic whose ends are pinned and whose one
// control point is the whole animation — `M0,100 Q483.5,100 967,100` at rest.
const viewBoxWidth = 967;
const baseline = 100;
const restControlX = viewBoxWidth / 2;

// A quadratic peaks at half its control-point offset, so the control point has
// to travel twice as far as the displacement you actually want to see.
const controlGain = 2;
const maxVisualPull = 30;

// Trailing zeros trimmed so the resting path is literally the reference's
// `M0,100 Q483.5,100 967,100`.
const trim = (n: number) => Number(n.toFixed(1)).toString();

function createStringPath(controlX: number, controlY: number) {
  return `M0,${baseline} Q${trim(controlX)},${trim(baseline + controlY * controlGain)} ${viewBoxWidth},${baseline}`;
}

const restingPath = createStringPath(restControlX, 0);

type StringMotion = {
  x: number;
  y: number;
  velocityY: number;
  targetX: number;
  targetY: number;
  hovering: boolean;
  frame: number | null;
};

export function ElasticDivider() {
  const pathRef = useRef<SVGPathElement>(null);
  const motionRef = useRef<StringMotion>({
    x: restControlX,
    y: 0,
    velocityY: 0,
    targetX: restControlX,
    targetY: 0,
    hovering: false,
    frame: null,
  });

  const drawFrame = () => {
    const string = motionRef.current;

    if (string.hovering) {
      const previousY = string.y;
      string.x += (string.targetX - string.x) * 0.105;
      string.y += (string.targetY - string.y) * 0.105;
      string.velocityY = string.y - previousY;
    } else {
      // Cross the baseline a few times so the release feels like a loose string.
      string.velocityY += -string.y * 0.026;
      string.velocityY *= 0.935;
      string.y += string.velocityY;
      string.x += (restControlX - string.x) * 0.025;
    }

    pathRef.current?.setAttribute('d', createStringPath(string.x, string.y));

    const hasSettled =
      !string.hovering &&
      Math.abs(string.y) < 0.08 &&
      Math.abs(string.velocityY) < 0.08 &&
      Math.abs(string.x - restControlX) < 0.15;

    if (hasSettled) {
      string.x = restControlX;
      string.y = 0;
      string.velocityY = 0;
      string.frame = null;
      pathRef.current?.setAttribute('d', restingPath);
      return;
    }

    string.frame = window.requestAnimationFrame(drawFrame);
  };

  const startMotion = () => {
    const string = motionRef.current;
    if (string.frame === null) {
      string.frame = window.requestAnimationFrame(drawFrame);
    }
  };

  const handleMove = (event: React.PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const string = motionRef.current;
    const progress = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * baseline * 2;

    // Taper towards the pinned ends, where a real string can barely move.
    const edgeInfluence = Math.max(0, Math.min(1, (Math.min(progress, 1 - progress) * 2) / 0.34));

    string.hovering = true;
    string.targetX = progress * viewBoxWidth;
    string.targetY =
      Math.max(-maxVisualPull, Math.min(maxVisualPull, pointerY - baseline)) * edgeInfluence;
    startMotion();
  };

  const releaseString = () => {
    motionRef.current.hovering = false;
    startMotion();
  };

  useEffect(
    () => () => {
      const frame = motionRef.current.frame;
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    },
    [],
  );

  return (
    <motion.svg
      className="elastic-divider"
      viewBox={`0 0 ${viewBoxWidth} ${baseline * 2}`}
      preserveAspectRatio="none"
      onPointerEnter={handleMove}
      onPointerMove={handleMove}
      onPointerLeave={releaseString}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.65 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.path
        ref={pathRef}
        d={restingPath}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.65 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.svg>
  );
}
