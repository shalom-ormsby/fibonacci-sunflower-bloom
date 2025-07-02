import React, { useEffect, useState } from 'react';

interface DotPosition {
  x: number;
  y: number;
  index: number;
}

const FibonacciSunflower: React.FC = () => {
  const [visibleDots, setVisibleDots] = useState<DotPosition[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Golden angle in radians (137.508°)
  const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
  const MAX_DOTS = 500;
  const CENTER_X = 400;
  const CENTER_Y = 400;
  const SCALE_FACTOR = 3;

  // Generate position for a dot using Fibonacci spiral
  const getDotPosition = (index: number): DotPosition => {
    const angle = index * GOLDEN_ANGLE;
    const radius = SCALE_FACTOR * Math.sqrt(index);
    
    return {
      x: CENTER_X + radius * Math.cos(angle),
      y: CENTER_Y + radius * Math.sin(angle),
      index
    };
  };

  // Generate all dot positions
  const allDots = Array.from({ length: MAX_DOTS }, (_, i) => getDotPosition(i));

  useEffect(() => {
    if (currentIndex >= MAX_DOTS) return;

    const timer = setTimeout(() => {
      setVisibleDots(prev => [...prev, allDots[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, 20); // Adjust speed here (lower = faster)

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const resetAnimation = () => {
    setVisibleDots([]);
    setCurrentIndex(0);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-golden mb-2">Fibonacci Sunflower Spiral</h2>
        <p className="text-muted-foreground mb-4">
          {visibleDots.length} / {MAX_DOTS} dots - Golden angle: 137.508°
        </p>
        <button
          onClick={resetAnimation}
          className="px-6 py-2 bg-golden text-primary-foreground rounded-lg hover:bg-golden-dark transition-colors"
        >
          Restart Animation
        </button>
      </div>

      <div className="relative border border-muted rounded-lg overflow-hidden">
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          className="bg-card"
        >
          {/* Center dot (special case) */}
          {visibleDots.length > 0 && (
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="3"
              fill="hsl(var(--sunflower))"
              opacity="1"
            >
              <animate
                attributeName="r"
                values="0;3"
                dur="0.3s"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                values="0;1"
                dur="0.3s"
                fill="freeze"
              />
            </circle>
          )}

          {/* All other dots */}
          {visibleDots.slice(1).map((dot, index) => {
            const dotRadius = Math.max(1, 2.5 - (dot.index / MAX_DOTS) * 1.5);
            const hue = 45 + (dot.index / MAX_DOTS) * 60; // Golden to orange gradient
            
            return (
              <circle
                key={dot.index}
                cx={dot.x}
                cy={dot.y}
                r={dotRadius}
                fill={`hsl(${hue}, 85%, ${70 - (dot.index / MAX_DOTS) * 20}%)`}
                opacity="0"
              >
                <animate
                  attributeName="r"
                  values={`0;${dotRadius}`}
                  dur="0.2s"
                  begin={`${index * 0.02}s`}
                  fill="freeze"
                />
                <animate
                  attributeName="opacity"
                  values="0;1"
                  dur="0.2s"
                  begin={`${index * 0.02}s`}
                  fill="freeze"
                />
              </circle>
            );
          })}

          {/* Subtle spiral guide lines for first few spirals */}
          {visibleDots.length > 50 && (
            <g opacity="0.1">
              {[1, 2, 3, 5, 8, 13, 21].map((fibNum, spiralIndex) => {
                const points = [];
                for (let i = 0; i < Math.min(visibleDots.length, 200); i += fibNum) {
                  const dot = allDots[i];
                  points.push(`${dot.x},${dot.y}`);
                }
                return (
                  <polyline
                    key={spiralIndex}
                    points={points.join(' ')}
                    fill="none"
                    stroke="hsl(var(--golden))"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>
          )}
        </svg>
      </div>

      <div className="text-sm text-muted-foreground text-center max-w-2xl">
        <p>
          This animation demonstrates the Fibonacci spiral found in sunflower seed arrangements. 
          Each dot is positioned using the golden angle (137.508°), creating the natural spiral 
          pattern that maximizes packing efficiency.
        </p>
      </div>
    </div>
  );
};

export default FibonacciSunflower;