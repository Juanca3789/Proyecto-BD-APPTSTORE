import type { CSSProperties } from 'react';

type SceneVariant = 'hero' | 'page' | 'minimal';

interface SceneBackgroundProps {
  variant?: SceneVariant;
  watermark?: string;
}

export function SceneBackground({ variant = 'hero', watermark }: SceneBackgroundProps) {
  const isHero = variant === 'hero';

  return (
    <div className={`scene-bg scene-bg--${variant}`} aria-hidden>
      <div className="hex-mesh" />
      <div className="hex-mesh hex-mesh--fine" />

      {isHero && (
        <>
          <div className="hero-watermark">{watermark ?? '17'}</div>
          <div className="stadium-ring stadium-ring--1" />
          <div className="stadium-ring stadium-ring--2" />
        </>
      )}

      <div className="scene-3d">
        <div className="shape-wire-cube">
          <div className="wire-cube-face wire-cube-face--front" />
          <div className="wire-cube-face wire-cube-face--back" />
          <div className="wire-cube-face wire-cube-face--right" />
          <div className="wire-cube-face wire-cube-face--left" />
          <div className="wire-cube-face wire-cube-face--top" />
          <div className="wire-cube-face wire-cube-face--bottom" />
        </div>

        <div className="shape-hex-prism">
          <div className="hex-face hex-face--1" />
          <div className="hex-face hex-face--2" />
          <div className="hex-face hex-face--3" />
          <div className="hex-face hex-face--4" />
          <div className="hex-face hex-face--5" />
          <div className="hex-face hex-face--6" />
        </div>

        <div className="shape-orbit-ring">
          <div className="orbit-dot orbit-dot--1" />
          <div className="orbit-dot orbit-dot--2" />
          <div className="orbit-dot orbit-dot--3" />
        </div>

        {isHero && (
          <>
            <div className="shape-pyramid" />
            <div className="particle-field">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="particle" style={{ '--i': i } as CSSProperties} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="scan-beam" />
    </div>
  );
}
