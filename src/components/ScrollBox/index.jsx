import React from 'react';
import styles from "../ScrollBox/ScrollBox.module.scss"

const ScrollBox = ({ buttons }) => {
  return (
    <div className={styles.scrollBoxContainer}>
      <div className={styles.scrollBoxContent}>
        {buttons.map((button) => (
          <button key={button.id} className={styles.scrollBoxButton}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollBox;