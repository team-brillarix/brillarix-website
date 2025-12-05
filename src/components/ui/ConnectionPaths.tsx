'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';

export interface ConnectionPath {
  id: string;
  d: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  // Optional: if provided, path will be recalculated from grid coordinates
  gridStartPoint?: { x: number; y: number };
  gridEndPoint?: { x: number; y: number };
  gridWaypoints?: Array<{ 
    x: number; 
    y: number; 
    type: 'vertical' | 'horizontal' | 'quadratic';
    // For quadratic curves: control point and end point
    controlPoint?: { x: number; y: number };
    curveEndPoint?: { x: number; y: number };
  }>;
}

export interface ConnectionPathsProps {
  paths: ConnectionPath[];
  className?: string;
  connectionLineClassName?: string;
  animatedSegmentClassName?: string;
  animationDuration?: number;
  connectionLineColor?: string;
  animatedSegmentColor?: string;
  strokeWidth?: {
    connection?: number;
    animated?: number;
  };
  gridCols?: number;
  gridRows?: number;
}

export function ConnectionPaths({
  paths,
  className = '',
  connectionLineClassName = '',
  animatedSegmentClassName = '',
  animationDuration = 2.5,
  connectionLineColor = 'rgba(255, 255, 255, 0.3)',
  animatedSegmentColor = 'rgba(255, 255, 255, 0.9)',
  strokeWidth = { connection: 0.2, animated: 0.5 },
  gridCols = 7,
  gridRows = 6,
}: ConnectionPathsProps) {
  const [viewBox, setViewBox] = useState('0 0 100 100');
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [activePathLength, setActivePathLength] = useState<number | null>(null);

  useEffect(() => {
    setViewBox('0 0 100 100');
  }, []);

  const handleAnimationComplete = () => {
    setActiveSegmentIndex((prev) => (prev + 1) % paths.length);
  };

  useEffect(() => {
    setActivePathLength(null);
  }, [activeSegmentIndex]);

  const convertGridToPercent = (gridX: number, gridY: number) => {
    const percentX = (gridX / gridCols) * 100;
    const percentY = (gridY / gridRows) * 100;
    return { x: percentX, y: percentY };
  };

  const generatePathFromGrid = (path: ConnectionPath): string => {
    if (!path.gridStartPoint || !path.gridEndPoint) {
      return path.d;
    }

    const start = convertGridToPercent(path.gridStartPoint.x, path.gridStartPoint.y);
    const end = convertGridToPercent(path.gridEndPoint.x, path.gridEndPoint.y);

    if (path.gridWaypoints && path.gridWaypoints.length > 0) {
      let pathString = `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`;
      
      path.gridWaypoints.forEach((waypoint) => {
        const wp = convertGridToPercent(waypoint.x, waypoint.y);
        
        if (waypoint.type === 'vertical') {
          pathString += ` V ${wp.y.toFixed(2)}`;
        } else if (waypoint.type === 'horizontal') {
          pathString += ` H ${wp.x.toFixed(2)}`;
        } else if (waypoint.type === 'quadratic' && waypoint.controlPoint && waypoint.curveEndPoint) {
          const control = convertGridToPercent(waypoint.controlPoint.x, waypoint.controlPoint.y);
          const curveEnd = convertGridToPercent(waypoint.curveEndPoint.x, waypoint.curveEndPoint.y);
          pathString += ` Q ${control.x.toFixed(2)} ${control.y.toFixed(2)} ${curveEnd.x.toFixed(2)} ${curveEnd.y.toFixed(2)}`;
        }
      });
      
      const lastWp = path.gridWaypoints[path.gridWaypoints.length - 1];
      if (lastWp.type === 'quadratic' && lastWp.curveEndPoint) {
        const lastCurveEnd = convertGridToPercent(lastWp.curveEndPoint.x, lastWp.curveEndPoint.y);
        if (Math.abs(lastCurveEnd.x - end.x) > 0.1 || Math.abs(lastCurveEnd.y - end.y) > 0.1) {
          pathString += ` H ${end.x.toFixed(2)}`;
        }
      } else {
        const lastWpPercent = convertGridToPercent(lastWp.x, lastWp.y);
        if (Math.abs(lastWpPercent.x - end.x) > 0.1 || Math.abs(lastWpPercent.y - end.y) > 0.1) {
          pathString += ` L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
        }
      }
      
      return pathString;
    }

    return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} L ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
  };

  const convertedPaths = useMemo(() => {
    return paths.map((path) => {
      const convertedD = generatePathFromGrid(path);
      const startPercent = path.gridStartPoint 
        ? convertGridToPercent(path.gridStartPoint.x, path.gridStartPoint.y)
        : path.startPoint;
      const endPercent = path.gridEndPoint
        ? convertGridToPercent(path.gridEndPoint.x, path.gridEndPoint.y)
        : path.endPoint;

      return {
        ...path,
        d: convertedD,
        startPoint: startPercent,
        endPoint: endPercent,
      };
    });
  }, [paths, gridCols, gridRows]);

  if (paths.length === 0) return null;

  const activePath = convertedPaths[activeSegmentIndex];
  
  const dashLength = 5;
  const targetOffset = activePathLength !== null ? -(activePathLength + dashLength) : -50;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        viewBox={viewBox}
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <style>{`
            .connection-line {
              stroke: ${connectionLineColor};
              stroke-width: ${strokeWidth.connection};
              stroke-dasharray: 0.6 0.6;
              fill: none;
            }
            .animated-segment {
              stroke: ${animatedSegmentColor};
              stroke-width: ${strokeWidth.animated};
              fill: none;
              filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
            }
          `}</style>
        </defs>
        {convertedPaths.map((path) => (
          <path
            key={`base-${path.id}`}
            className={`connection-line ${connectionLineClassName}`}
            d={path.d}
          />
        ))}
        {activePath && (
          <motion.path
            key={`animated-${activePath.id}-${activeSegmentIndex}-${activePathLength !== null ? 'ready' : 'measuring'}`}
            ref={(el: SVGPathElement | null) => {
              if (el && activePathLength === null) {
                const length = el.getTotalLength();
                setActivePathLength(length);
              }
            }}
            className={`animated-segment ${animatedSegmentClassName}`}
            d={activePath.d}
            strokeDasharray="5 10000"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: targetOffset }}
            transition={{
              duration: animationDuration,
              ease: 'linear',
            }}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </svg>
    </div>
  );
}