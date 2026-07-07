"use client";

import { useState } from "react";

interface ProgressBarProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  className?: string;
  showTooltip?: boolean;
}

export default function ProgressBar({
  value,
  max,
  onChange,
  formatValue,
  className = "",
  showTooltip = true,
}: ProgressBarProps) {
  const [hoveredProgress, setHoveredProgress] = useState<{
    value: number;
    left: number;
  } | null>(null);

  const updateHoveredProgress = (clientX: number, rect: DOMRect) => {
    if (!max) return;

    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const val = ratio * max;

    setHoveredProgress({
      value: val,
      left: ratio * 100,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateHoveredProgress(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const clearHover = () => {
    setHoveredProgress(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  const progressPercent = max ? (value / max) * 100 : 0;

  const defaultFormat = (v: number) => {
    if (max === 1) return `${Math.round(v * 100)}%`;
    return v.toFixed(1);
  };

  const format = formatValue || defaultFormat;

  return (
    <div
      className={`group relative flex-1 px-1 py-3 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
      onMouseLeave={clearHover}
    >
      {showTooltip && hoveredProgress && (
        <div
          className="pointer-events-none absolute bottom-full mb-2 -translate-x-1/2 rounded border border-white/10 bg-zinc-900 px-2 py-1 text-xs text-white shadow-lg"
          style={{ left: `${hoveredProgress.left}%` }}
        >
          {format(hoveredProgress.value)}
        </div>
      )}

      {/* Background track */}
      <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-zinc-600/80 transition-all duration-150 group-hover:h-3" />

      {/* Filled progress */}
      <div
        className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white transition-all duration-150"
        style={{ width: `${progressPercent}%` }}
      />

      {/* Hover dot (only when hovering) */}
      {showTooltip && hoveredProgress && (
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
          style={{ left: `${hoveredProgress.left}%` }}
        />
      )}

      {/* Hidden native range input for interaction */}
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={handleChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        step={max === 1 ? 0.01 : 0.1}
      />
    </div>
  );
}
