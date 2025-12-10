'use client';

import { useState, useEffect, useMemo, useRef, useCallback, startTransition } from 'react';
import { motion, useMotionValue } from 'motion/react';

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

export interface IconPosition {
  id: string;
  gridX: number;
  gridY: number;
  radius?: number; // Icon radius in percentage (default: 3)
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
  iconPositions?: IconPosition[];
  onIconActiveChange?: (activeIcons: Set<string>) => void;
}

export function ConnectionPaths({
  paths,
  className = '',
  connectionLineClassName = '',
  animatedSegmentClassName = '',
  animationDuration = 12,
  connectionLineColor = 'rgba(255, 255, 255, 0.3)',
  animatedSegmentColor = 'rgba(255, 255, 255, 0.9)',
  strokeWidth = { connection: 0.2, animated: 0.5 },
  gridCols = 7,
  gridRows = 6,
  iconPositions = [],
  onIconActiveChange,
}: ConnectionPathsProps) {
  const [viewBox, setViewBox] = useState('0 0 100 100');
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [activePathLength, setActivePathLength] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0); // Force animation restart
  const [shouldAnimate, setShouldAnimate] = useState(false); // Control when to start animation
  const pathRef = useRef<SVGPathElement | null>(null);
  const activeIconsRef = useRef<Set<string>>(new Set());
  const pendingIconsUpdateRef = useRef<Set<string> | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const dashOffset = useMotionValue(-10000); // Start hidden

  useEffect(() => {
    setViewBox('0 0 100 100');
  }, []);

  // Helper function to check if two paths are connected at an icon
  const arePathsConnectedAtIcon = useCallback((path1: ConnectionPath, path2: ConnectionPath): string | null => {
    if (!path1.gridEndPoint || !path2.gridStartPoint) return null;
    
    // Check if path1 ends where path2 starts (within a small tolerance)
    const tolerance = 0.1;
    const endX = path1.gridEndPoint.x;
    const endY = path1.gridEndPoint.y;
    const startX = path2.gridStartPoint.x;
    const startY = path2.gridStartPoint.y;
    
    if (Math.abs(endX - startX) < tolerance && Math.abs(endY - startY) < tolerance) {
      // Find which icon is at this position
      for (const icon of iconPositions) {
        const iconX = icon.gridX;
        const iconY = icon.gridY;
        if (Math.abs(endX - iconX) < tolerance && Math.abs(endY - iconY) < tolerance) {
          return icon.id;
        }
      }
    }
    return null;
  }, [iconPositions]);

  const handleAnimationComplete = () => {
    const currentPath = paths[activeSegmentIndex];
    const nextIndex = (activeSegmentIndex + 1) % paths.length;
    const nextPath = paths[nextIndex];
    
    // Check if paths are connected at an icon
    const connectedIconId = arePathsConnectedAtIcon(currentPath, nextPath);
    
    // Clear all icons when animation completes
    // They will be reactivated as the segment passes through them
    activeIconsRef.current.clear();
    if (onIconActiveChange) {
      onIconActiveChange(new Set());
    }
    
    // Move to next path (or loop back to first if single path)
    setActiveSegmentIndex(nextIndex);
    // Force animation restart by incrementing key
    setAnimationKey(prev => prev + 1);
  };

  useEffect(() => {
    setActivePathLength(null);
    setShouldAnimate(false);
    dashOffset.set(-10000); // Hide segment until path is measured
    // Clear all icons when switching paths to prevent stale activations
    activeIconsRef.current.clear();
    if (onIconActiveChange) {
      onIconActiveChange(new Set());
    }
  }, [activeSegmentIndex, animationKey, onIconActiveChange, dashOffset]);

  // Reset animation to start when path length is measured
  useEffect(() => {
    if (activePathLength !== null && !shouldAnimate) {
      // Small delay to ensure DOM is ready, then start animation from beginning
      const timer = setTimeout(() => {
        dashOffset.set(0);
        setShouldAnimate(true);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [activePathLength, dashOffset, shouldAnimate]);

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

  // Convert icon positions to percentage coordinates
  const iconPositionsPercent = useMemo(() => {
    return iconPositions.map((icon) => {
      const pos = convertGridToPercent(icon.gridX, icon.gridY);
      const radius = icon.radius ?? 3;
      return {
        id: icon.id,
        x: pos.x,
        y: pos.y,
        radius,
      };
    });
  }, [iconPositions, gridCols, gridRows]);

  // Check if a point is within an icon's area
  const isPointInIcon = (point: { x: number; y: number }, icon: { x: number; y: number; radius: number }) => {
    const distance = Math.sqrt(Math.pow(point.x - icon.x, 2) + Math.pow(point.y - icon.y, 2));
    return distance <= icon.radius;
  };

  // Function to check and update active icons based on animation offset
  const checkActiveIcons = useCallback((offset: number) => {
    if (!pathRef.current || activePathLength === null || iconPositionsPercent.length === 0 || !onIconActiveChange) {
      return;
    }

    const path = pathRef.current;
    const totalLength = activePathLength;
    const dashLength = 5;
    
    // Calculate the progress (0 to 1)
    // offset goes from 0 to -(totalLength + dashLength)
    const progress = Math.max(0, Math.min(1, -offset / (totalLength + dashLength)));
    
    // Calculate the start and end distances of the visible segment along the path
    // The segment starts at progress * totalLength and extends dashLength units forward
    const segmentStartDistance = progress * totalLength;
    const segmentEndDistance = Math.min(totalLength, segmentStartDistance + dashLength);
    
    // Sample multiple points along the visible segment to ensure accurate detection
    // This prevents missing icons when the segment passes through quickly
    const sampleCount = 8; // Check 8 points along the segment
    const segmentPoints: { x: number; y: number }[] = [];
    
    try {
      for (let i = 0; i <= sampleCount; i++) {
        const t = i / sampleCount;
        const distance = segmentStartDistance + (segmentEndDistance - segmentStartDistance) * t;
        const clampedDistance = Math.max(0, Math.min(totalLength, distance));
        const point = path.getPointAtLength(clampedDistance);
        segmentPoints.push({ x: point.x, y: point.y });
      }
    } catch (e) {
      // Path might not be ready yet
      return;
    }

    if (segmentPoints.length === 0) return;

    // Use multiple points along the segment for accurate detection
    // This ensures we catch icons at the start, middle, and end of the segment
    const segmentLeadingEdge = segmentPoints[segmentPoints.length - 1];
    const segmentStart = segmentPoints[0];
    const centerIndex = Math.floor(segmentPoints.length / 2);
    const segmentCenter = segmentPoints[centerIndex];

    // Check which icons the segment intersects with
    // Check all points along the segment to ensure we catch icons at any position
    const newActiveIcons = new Set<string>();
    
    // Check all icons to see if any point along the segment is within their radius
    iconPositionsPercent.forEach((icon) => {
      // Check all points along the segment to ensure we catch icons at any position
      // This is especially important for icons at the start of the path (like bulb)
      for (let i = 0; i < segmentPoints.length; i++) {
        if (isPointInIcon(segmentPoints[i], icon)) {
          newActiveIcons.add(icon.id);
          break; // Found a match, no need to check other points for this icon
        }
      }
    });
    
    // Icons that are not in newActiveIcons will be automatically cleared
    // because we only update with the icons that are currently intersected

    // Ensure only a single icon is active at any time.
    // If multiple icons are detected (for example when the animated segment
    // is close to two icons), keep only the one whose center is closest
    // to the animated segment's center point.
    if (newActiveIcons.size > 1) {
      let closestIconId: string | null = null;
      let closestDistance = Infinity;

      iconPositionsPercent.forEach((icon) => {
        if (!newActiveIcons.has(icon.id)) return;
        // Use leading edge distance for more accurate closest icon selection
        const distance = Math.sqrt(
          Math.pow(segmentLeadingEdge.x - icon.x, 2) + Math.pow(segmentLeadingEdge.y - icon.y, 2)
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIconId = icon.id;
        }
      });

      if (closestIconId) {
        newActiveIcons.clear();
        newActiveIcons.add(closestIconId);
      }
    }

    // Only update if the set has changed
    const currentIds = Array.from(activeIconsRef.current).sort().join(',');
    const newIds = Array.from(newActiveIcons).sort().join(',');
    
    if (currentIds !== newIds) {
      activeIconsRef.current = newActiveIcons;
      // Store pending update
      pendingIconsUpdateRef.current = newActiveIcons;
      
      // Schedule update using requestAnimationFrame if not already scheduled
      if (rafIdRef.current === null && onIconActiveChange) {
        rafIdRef.current = requestAnimationFrame(() => {
          if (pendingIconsUpdateRef.current !== null) {
            startTransition(() => {
              onIconActiveChange(pendingIconsUpdateRef.current!);
            });
            pendingIconsUpdateRef.current = null;
          }
          rafIdRef.current = null;
        });
      }
    }
  }, [activePathLength, iconPositionsPercent, onIconActiveChange]);

  // Listen to dashOffset changes and update active icons
  useEffect(() => {
    if (!onIconActiveChange || iconPositionsPercent.length === 0) {
      return;
    }

    const unsubscribe = dashOffset.on('change', (latest) => {
      checkActiveIcons(latest);
    });
    return () => {
      unsubscribe();
      // Clean up any pending requestAnimationFrame
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [dashOffset, checkActiveIcons]);

  if (paths.length === 0) return null;

  const activePath = convertedPaths[activeSegmentIndex];
  
  const dashLength = 5;
  const targetOffset = activePathLength !== null ? -(activePathLength + dashLength) : -10000;

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
            key={`animated-${activePath.id}-${activeSegmentIndex}-${animationKey}-${shouldAnimate ? 'animating' : 'waiting'}`}
            ref={(el: SVGPathElement | null) => {
              if (el && activePathLength === null) {
                const length = el.getTotalLength();
                setActivePathLength(length);
              }
              pathRef.current = el;
            }}
            className={`animated-segment ${animatedSegmentClassName}`}
            d={activePath.d}
            strokeDasharray="5 10000"
            strokeDashoffset={dashOffset}
            initial={{ strokeDashoffset: shouldAnimate ? 0 : -10000 }}
            animate={shouldAnimate && activePathLength !== null ? { strokeDashoffset: targetOffset } : { strokeDashoffset: -10000 }}
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