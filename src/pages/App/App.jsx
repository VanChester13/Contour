import React, { useState } from "react";
import ScrollBox from "../../components/ScrollBox";
import ColorPicker from "../../components/ColorPicker";
import styles from "../App/App.module.scss";

const App = () => {
  const [buttons, setButtons] = useState([]);
  const [selectedColor, setSelectedColor] = useState({ r: 255, g: 0, b: 0 });
  const [brightness, setBrightness] = useState(100);

  const handleAddButtons = () => {
    const lastButtonId =
      buttons.length > 0 ? buttons[buttons.length - 1].id : 0;
    const newButtons = Array.from({ length: 16 }, (_, i) => ({
      id: lastButtonId + i + 1,
      label: `Помещение ${lastButtonId + i + 1}`,
    }));
    setButtons([...buttons, ...newButtons]);
  };

  const handleSendColor = () => {
    const colorData = {
      r: Math.round(selectedColor.r * (brightness / 100)),
      g: Math.round(selectedColor.g * (brightness / 100)),
      b: Math.round(selectedColor.b * (brightness / 100)),
    };
    console.log("Sending color:", colorData); 
  };

  const handleBrightnessChange = (newBrightness) => {
    setBrightness(newBrightness);
  };

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <ScrollBox buttons={buttons} />
      </header>
      <main className={styles.appMain}>
        {
          <ColorPicker
            onColorChange={handleColorChange}
            onBrightnessChange={handleBrightnessChange}
            brightness={brightness}
            selectedColor={selectedColor}
          />
        }
        <div className={styles.buttonContainer}>
          <button onClick={handleAddButtons}>Добавить</button>
          <button onClick={handleSendColor}>Отправить</button>
        </div>
      </main>
    </div>
  );
};
export default App;