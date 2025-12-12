'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';

const DEFAULT_ICON_RADIUS = 3;
const DEFAULT_DASH_LENGTH = 5;
const DEFAULT_SAMPLE_COUNT = 12;
const COORDINATE_PRECISION = 2;
const COORDINATE_TOLERANCE = 0.1;
const ICON_EDGE_OFFSET = 14;
const ICON_BOTTOM_OFFSET = 2;

export interface ConnectionPath {
  id: string;
  d: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  gridStartPoint?: { x: number; y: number };
  gridEndPoint?: { x: number; y: number };
  gridWaypoints?: Array<{ 
    x: number; 
    y: number; 
    type: 'vertical' | 'horizontal' | 'quadratic';
    controlPoint?: { x: number; y: number };
    curveEndPoint?: { x: number; y: number };
  }>;
}

export interface IconPosition {
  id: string;
  gridX: number;
  gridY: number;
  radius?: number;
  width?: number;
  height?: number;
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
  const [pathLength, setPathLength] = useState<number>(0);
  const activeIconsRef = useRef<Set<string>>(new Set());
  const pathRef = useRef<SVGPathElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const animationIdRef = useRef<string>(`path-animation-${Math.random().toString(36).substring(2, 11)}`);
  const pauseDuration = 1;
  const totalAnimationDuration = animationDuration + pauseDuration;

  const convertGridToPercent = useCallback((gridX: number, gridY: number) => {
    const percentX = (gridX / gridCols) * 100;
    const percentY = (gridY / gridRows) * 100;
    return { x: percentX, y: percentY };
  }, [gridCols, gridRows]);

  const generatePathFromGrid = useCallback((path: ConnectionPath): string => {
    if (!path.gridStartPoint || !path.gridEndPoint) {
      return path.d;
    }

    const start = convertGridToPercent(path.gridStartPoint.x, path.gridStartPoint.y);
    const end = convertGridToPercent(path.gridEndPoint.x, path.gridEndPoint.y);

    if (path.gridWaypoints && path.gridWaypoints.length > 0) {
      let pathString = `M ${start.x.toFixed(COORDINATE_PRECISION)} ${start.y.toFixed(COORDINATE_PRECISION)}`;
      
      path.gridWaypoints.forEach((waypoint) => {
        const wp = convertGridToPercent(waypoint.x, waypoint.y);
        
        if (waypoint.type === 'vertical') {
          pathString += ` V ${wp.y.toFixed(COORDINATE_PRECISION)}`;
        } else if (waypoint.type === 'horizontal') {
          pathString += ` H ${wp.x.toFixed(COORDINATE_PRECISION)}`;
        } else if (waypoint.type === 'quadratic' && waypoint.controlPoint && waypoint.curveEndPoint) {
          const control = convertGridToPercent(waypoint.controlPoint.x, waypoint.controlPoint.y);
          const curveEnd = convertGridToPercent(waypoint.curveEndPoint.x, waypoint.curveEndPoint.y);
          pathString += ` Q ${control.x.toFixed(COORDINATE_PRECISION)} ${control.y.toFixed(COORDINATE_PRECISION)} ${curveEnd.x.toFixed(COORDINATE_PRECISION)} ${curveEnd.y.toFixed(COORDINATE_PRECISION)}`;
        }
      });
      
      const lastWp = path.gridWaypoints[path.gridWaypoints.length - 1];
      if (lastWp.type === 'quadratic' && lastWp.curveEndPoint) {
        const lastCurveEnd = convertGridToPercent(lastWp.curveEndPoint.x, lastWp.curveEndPoint.y);
        if (Math.abs(lastCurveEnd.x - end.x) > COORDINATE_TOLERANCE || Math.abs(lastCurveEnd.y - end.y) > COORDINATE_TOLERANCE) {
          pathString += ` H ${end.x.toFixed(COORDINATE_PRECISION)}`;
        }
      } else {
        const lastWpPercent = convertGridToPercent(lastWp.x, lastWp.y);
        if (Math.abs(lastWpPercent.x - end.x) > COORDINATE_TOLERANCE || Math.abs(lastWpPercent.y - end.y) > COORDINATE_TOLERANCE) {
          pathString += ` L ${end.x.toFixed(COORDINATE_PRECISION)} ${end.y.toFixed(COORDINATE_PRECISION)}`;
        }
      }
      
      return pathString;
    }

    return `M ${start.x.toFixed(COORDINATE_PRECISION)} ${start.y.toFixed(COORDINATE_PRECISION)} L ${end.x.toFixed(COORDINATE_PRECISION)} ${end.y.toFixed(COORDINATE_PRECISION)}`;
  }, [convertGridToPercent]);

  const convertedPaths = useMemo(() => {
    return paths.map((path) => {
      const convertedD = generatePathFromGrid(path);
      return {
        ...path,
        d: convertedD,
      };
    });
  }, [paths, generatePathFromGrid]);

  const iconBounds = useMemo(() => {
    return iconPositions.map((icon) => {
      const iconPos = convertGridToPercent(icon.gridX, icon.gridY);
      const radius = icon.radius ?? DEFAULT_ICON_RADIUS;
      const iconWidth = icon.width ?? radius * 2;
      const iconHeight = icon.height ?? radius * 2;
      
      return {
        id: icon.id,
        center: iconPos,
        left: iconPos.x - iconWidth / 2 - ICON_EDGE_OFFSET,
        right: iconPos.x + iconWidth / 2,
        top: iconPos.y - iconHeight / 2,
        bottom: iconPos.y + iconHeight / 2 - ICON_BOTTOM_OFFSET,
        width: iconWidth,
        height: iconHeight,
      };
    });
  }, [iconPositions, convertGridToPercent]);

  useEffect(() => {
    if (!pathRef.current || !onIconActiveChange || iconBounds.length === 0 || pathLength === 0) {
      return;
    }

    const path = pathRef.current;
    const totalLength = pathLength;
    const maxOffset = totalLength + DEFAULT_DASH_LENGTH;
    const dashLengthInPathUnits = (DEFAULT_DASH_LENGTH / 100) * totalLength;
    
    const bulbIcon = iconBounds.find((bounds) => {
      const startIcon = iconPositions.find(ip => ip.id === 'bulb');
      return startIcon && bounds.id === startIcon.id;
    });

    const checkAnimationProgress = () => {
      if (!pathRef.current) return;

      try {
        const computedStyle = window.getComputedStyle(path);
        const currentOffset = parseFloat(computedStyle.strokeDashoffset) || 0;
        const progress = Math.max(0, Math.min(1, -currentOffset / maxOffset));
        
        const isInPausePhase = progress >= 0.995;
        
        const leadingEdgeDistance = progress * totalLength;
        const trailingEdgeDistance = Math.max(0, leadingEdgeDistance - dashLengthInPathUnits);
        const newActiveIcons = new Set<string>();
        
        if (isInPausePhase && bulbIcon) {
          newActiveIcons.add(bulbIcon.id);
        } else {
          let leadingEdgePoint: DOMPoint;
          try {
            leadingEdgePoint = path.getPointAtLength(leadingEdgeDistance);
          } catch {
            return;
          }
          
          let trailingEdgePoint = leadingEdgePoint;
          if (trailingEdgeDistance > 0) {
            try {
              trailingEdgePoint = path.getPointAtLength(trailingEdgeDistance);
            } catch {
              trailingEdgePoint = leadingEdgePoint;
            }
          }
          
          iconBounds.forEach((bounds) => {
            const leadingEdgeInBounds = 
              leadingEdgePoint.x >= bounds.left &&
              leadingEdgePoint.x <= bounds.right &&
              leadingEdgePoint.y >= bounds.top &&
              leadingEdgePoint.y <= bounds.bottom;
            
            const trailingEdgeInBounds = 
              trailingEdgePoint.x >= bounds.left &&
              trailingEdgePoint.x <= bounds.right &&
              trailingEdgePoint.y >= bounds.top &&
              trailingEdgePoint.y <= bounds.bottom;
            
            const leadingEdgeReachedLeft = leadingEdgePoint.x >= bounds.left;
            const leadingEdgeInVerticalRange = 
              leadingEdgePoint.y >= bounds.top && leadingEdgePoint.y <= bounds.bottom;
            const trailingEdgePassedRight = trailingEdgePoint.x > bounds.right;
            
            let shouldActivate = false;
            
            if (leadingEdgeReachedLeft && leadingEdgeInVerticalRange && !trailingEdgePassedRight) {
              shouldActivate = true;
            }
            
            if (leadingEdgeInBounds || trailingEdgeInBounds) {
              shouldActivate = true;
            }
            
            if (!shouldActivate) {
              for (let i = 0; i <= DEFAULT_SAMPLE_COUNT; i++) {
                const t = i / DEFAULT_SAMPLE_COUNT;
                const sampleDistance = trailingEdgeDistance + (leadingEdgeDistance - trailingEdgeDistance) * t;
                if (sampleDistance >= 0 && sampleDistance <= totalLength) {
                  try {
                    const samplePoint = path.getPointAtLength(sampleDistance);
                    if (
                      samplePoint.x >= bounds.left &&
                      samplePoint.x <= bounds.right &&
                      samplePoint.y >= bounds.top &&
                      samplePoint.y <= bounds.bottom
                    ) {
                      shouldActivate = true;
                      break;
                    }
                  } catch {
                    continue;
                  }
                }
              }
            }
            
            if (shouldActivate) {
              newActiveIcons.add(bounds.id);
            }
          });
        }
        
        const currentIds = Array.from(activeIconsRef.current).sort().join(',');
        const newIds = Array.from(newActiveIcons).sort().join(',');
        
        if (currentIds !== newIds) {
          activeIconsRef.current = newActiveIcons;
          onIconActiveChange(newActiveIcons);
        }
      } catch {
        return;
      }

      animationRef.current = requestAnimationFrame(checkAnimationProgress);
    };

    animationRef.current = requestAnimationFrame(checkAnimationProgress);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [iconBounds, onIconActiveChange, pathLength, iconPositions]);

  useEffect(() => {
    if (pathRef.current && pathLength === 0) {
      try {
        const length = pathRef.current.getTotalLength();
        if (length > 0) {
          setPathLength(length);
        }
      } catch {
        return;
      }
    }
  }, [convertedPaths, pathLength]);

  if (paths.length === 0) return null;

  const activePath = convertedPaths[0];
  const maxOffset = pathLength > 0 ? pathLength + DEFAULT_DASH_LENGTH : 0;
  
  const animationCompletePercent = (animationDuration / totalAnimationDuration) * 100;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
        aria-hidden="true"
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
              stroke-dashoffset: 0;
            }
            ${maxOffset > 0 ? `
            .animated-segment-${animationIdRef.current} {
              animation: pathAnimation-${animationIdRef.current} ${totalAnimationDuration}s linear infinite;
            }
            @keyframes pathAnimation-${animationIdRef.current} {
              0% {
                stroke-dashoffset: 0;
              }
              ${animationCompletePercent}% {
                stroke-dashoffset: -${maxOffset};
              }
              100% {
                stroke-dashoffset: -${maxOffset};
              }
            }
            ` : ''}
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
          <path
            ref={(el: SVGPathElement | null) => {
              if (el) {
                pathRef.current = el;
                if (pathLength === 0) {
                  try {
                    const length = el.getTotalLength();
                    if (length > 0) {
                      setPathLength(length);
                    }
                  } catch {
                    return;
                  }
                }
              }
            }}
            className={`animated-segment ${maxOffset > 0 ? `animated-segment-${animationIdRef.current}` : ''} ${animatedSegmentClassName}`}
            d={activePath.d}
            style={maxOffset > 0 ? {
              strokeDasharray: `${DEFAULT_DASH_LENGTH} ${maxOffset}`,
            } : undefined}
          />
        )}
      </svg>
    </div>
  );
}