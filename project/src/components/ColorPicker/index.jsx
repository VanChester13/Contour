import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "../ColorPicker/ColorPicker.module.scss";

const ColorPicker = ({
  onColorChange,
  onBrightnessChange,
  brightness,
  selectedColor,
}) => {
  const [localBrightness, setLocalBrightness] = useState(brightness);
  const canvasRef = useRef(null);

  const calculateRgbValue = useCallback((color, brightness) => {
    const adjustedR = Math.round(color.r * (brightness / 100));
    const adjustedG = Math.round(color.g * (brightness / 100));
    const adjustedB = Math.round(color.b * (brightness / 100));
    return `rgb(${adjustedR}, ${adjustedG}, ${adjustedB})`;
  }, []);

  const [rgbValue, setRgbValue] = useState(
    calculateRgbValue(selectedColor, brightness)
  );

  const drawPalette = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const r = Math.floor((x / width) * 255);
        const g = Math.floor((y / height) * 255);
        ctx.fillStyle = `rgb(${r}, ${g}, 0)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, []);

  useEffect(() => {
    drawPalette();
  }, [drawPalette]);

  useEffect(() => {
    setRgbValue(calculateRgbValue(selectedColor, localBrightness));
  }, [selectedColor, localBrightness, calculateRgbValue]);

  useEffect(() => {
    setLocalBrightness(brightness);
  }, [brightness]);

  const handlePaletteClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const r = pixelData[0];
    const g = pixelData[1];
    const b = pixelData[2];

    const newColor = { r, g, b };
    onColorChange(newColor);
    setRgbValue(calculateRgbValue(newColor, localBrightness));
  };

  const handleBrightnessChange = (e) => {
    const newBrightness = parseInt(e.target.value, 10);
    setLocalBrightness(newBrightness);
    onBrightnessChange(newBrightness);
    setRgbValue(calculateRgbValue(selectedColor, newBrightness));
  };

  return (
    <div className={styles.colorPickerContainer}>
      <div className={styles.sliderContainer}>
        <label htmlFor="brightness">Яркость: </label>
        <input
          type="range"
          id="brightness"
          min="0"
          max="100"
          value={localBrightness}
          onChange={handleBrightnessChange}
          className={styles.brightnessSlider}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className={styles.colorPalette}
        onClick={handlePaletteClick}
      />
      <div className={styles.rgbLabel}>
        Выбранный цвет:
        <div
          className={styles.selectedColorPreview}
          style={{ backgroundColor: rgbValue }}
        />
        <span>{rgbValue}</span>
      </div>
    </div>
  );
};

export default ColorPicker;
