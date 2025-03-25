"use client";

import createGlobe from "cobe";
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../hooks/useThemeContext";

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeContext = useContext(ThemeContext); // Get theme context

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    // Define colors and brightness based on theme
    const isDarkMode = themeContext.dark;
    const baseColor = isDarkMode ? [0.2, 0.2, 0.2] : [1, 1, 1]; // Dark gray vs light gray
    const glowColor = isDarkMode ? [.3, .3, .3] : [0.8, 0.8, 0.8]; // Bright white vs muted gray
    const mapBrightness = isDarkMode ? 6 : 4; // Brighter in dark mode, subtler in light

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 0,
      theta: 0.1,
      dark: isDarkMode ? 1 : 0, // Dark mode: fully dark background, Light mode: no darkness
      diffuse: 1.5,
      mapSamples: 16000,
      mapBrightness, // Dynamic brightness
      baseColor: baseColor as any, // Dynamic base color
      markerColor: [0.1, 0.8, 1], // Cyan markers, unchanged
      glowColor: glowColor as any, // Dynamic glow color
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
        { location: [40.7128, -74.006], size: 0.1 }, // New York
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.007;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [themeContext.dark]); // Re-run effect when theme changes

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 500, height: 500, maxWidth: '100%', aspectRatio: 1 }}
      className={className}
    />
  );
};