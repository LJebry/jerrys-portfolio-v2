import type * as React from "react";

interface SqueezeLoaderProps {
  size?: number;
  color1?: string;
  color2?: string;
  spinDuration?: number;
  squeezeDuration?: number;
  className?: string;
  containerClassName?: string;
}

export default function SqueezeLoader({
  size = 60,
  color1 = "#e8e4db",
  color2 = "#c42e2e",
  spinDuration = 10,
  squeezeDuration = 3,
  className = "",
  containerClassName = "",
}: SqueezeLoaderProps) {
  const loaderStyle = {
    "--color1": color1,
    "--color2": color2,
    "--spin-duration": `${spinDuration}s`,
    "--squeeze-duration": `${squeezeDuration}s`,
    width: `${size}px`,
    height: `${size}px`,
    animation: "squeeze-loader-spin var(--spin-duration) infinite linear",
  } as React.CSSProperties;

  return (
    <div
      className={`flex min-h-screen w-screen items-center justify-center bg-background ${containerClassName}`}
      role="status"
      aria-label="Loading"
    >
      <div className={`flex justify-center ${className}`}>
        <div className="relative" style={loaderStyle}>
          <div
            className="absolute"
            style={{
              background: "var(--color1)",
              animation: "squeeze-loader-squeeze var(--squeeze-duration) infinite",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              background: "var(--color2)",
              animation: "squeeze-loader-squeeze var(--squeeze-duration) infinite",
              animationDelay: "-1.25s",
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes squeeze-loader-squeeze {
            0% { inset: 0 2em 2em 0; }
            12.5% { inset: 0 2em 0 0; }
            25% { inset: 2em 2em 0 0; }
            37.5% { inset: 2em 0 0 0; }
            50% { inset: 2em 0 0 2em; }
            62.5% { inset: 0 0 0 2em; }
            75% { inset: 0 0 2em 2em; }
            87.5% { inset: 0 0 2em 0; }
            100% { inset: 0 2em 2em 0; }
          }

          @keyframes squeeze-loader-spin {
            to { transform: rotate(-360deg); }
          }
        `}
      </style>
    </div>
  );
}
