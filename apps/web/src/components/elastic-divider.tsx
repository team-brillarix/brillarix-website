'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const viewBoxWidth = 1328;
const baseline = 48;
const motionStart = 160;
const motionEnd = viewBoxWidth - motionStart;

function createStringPath(x: number, y: number) {
  const leftSpan = x - motionStart;
  const rightSpan = motionEnd - x;
  const peakY = baseline + y;

  // The outer 160 units on each side are literal straight lines. This pins
  // both ends in place and confines the string motion to the middle.
  return [
    `M 0 ${baseline}`,
    `L ${motionStart} ${baseline}`,
    `C ${(motionStart + leftSpan * 0.35).toFixed(2)} ${baseline}, ${(x - leftSpan * 0.18).toFixed(2)} ${peakY.toFixed(2)}, ${x.toFixed(2)} ${peakY.toFixed(2)}`,
    `C ${(x + rightSpan * 0.18).toFixed(2)} ${peakY.toFixed(2)}, ${(motionEnd - rightSpan * 0.35).toFixed(2)} ${baseline}, ${motionEnd} ${baseline}`,
    `L ${viewBoxWidth} ${baseline}`,
  ].join(' ');
}

const restingPath = createStringPath(viewBoxWidth / 2, 0);

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
    x: viewBoxWidth / 2,
    y: 0,
    velocityY: 0,
    targetX: viewBoxWidth / 2,
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
      string.x += (viewBoxWidth / 2 - string.x) * 0.025;
    }

    pathRef.current?.setAttribute('d', createStringPath(string.x, string.y));

    const hasSettled =
      !string.hovering &&
      Math.abs(string.y) < 0.08 &&
      Math.abs(string.velocityY) < 0.08 &&
      Math.abs(string.x - viewBoxWidth / 2) < 0.15;

    if (hasSettled) {
      string.x = viewBoxWidth / 2;
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
    const normalizedX = ((event.clientX - bounds.left) / bounds.width) * viewBoxWidth;
    const normalizedY = ((event.clientY - bounds.top) / bounds.height) * baseline * 2;
    const progress = Math.max(0, Math.min(1, normalizedX / viewBoxWidth));
    const easedProgress = progress * progress * (3 - 2 * progress);
    const edgeDistance = Math.min(progress, 1 - progress) * 2;
    const edgeInfluence = Math.max(0, Math.min(1, edgeDistance / 0.34));
    const motionRange = motionEnd - motionStart - 140;

    string.hovering = true;
    string.targetX = motionStart + 70 + motionRange * easedProgress;
    string.targetY = Math.max(-34, Math.min(34, normalizedY - baseline)) * edgeInfluence;
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
      viewBox="0 0 1328 96"
      preserveAspectRatio="none"
      width="1328"
      height="96"
      style={{ maxWidth: 'calc(100vw - 48px)', width: '1328px' }}
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
