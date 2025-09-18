import { useSliderSelector, type SelectSliderButton } from '@shared/store/useSliderSelector';
import * as styles from './TimelineCircle.module.scss'
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useNumberAnimation } from '@shared/hooks/useNumberAnimation';

export type TimelineCircleProps = {
  buttons: SelectSliderButton[];
};

export const TimelineCircle = ({ buttons }: TimelineCircleProps) => {
  const { currentItem, currentIndex, dispatch } = useSliderSelector();

  const [rotation, setRotation] = useState(0);
  const prevIndexRef = useRef(0);

  const { ref: startYearRef, currentValue: startYearValue } = useNumberAnimation(
    currentItem?.startYear || 0
  );
  
  const { ref: endYearRef, currentValue: endYearValue } = useNumberAnimation(
    currentItem?.endYear || 0
  );

  useEffect(() => {
    if (currentIndex !== -1 && currentIndex !== prevIndexRef.current) {
      const angleStep = 360 / buttons.length;
      let diff = currentIndex - prevIndexRef.current;

      if (diff > buttons.length / 2) diff -= buttons.length;
      if (diff < -buttons.length / 2) diff += buttons.length;

      setRotation(prev => prev - diff * angleStep);
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex, buttons]);

  const handleButtonClick = (button: SelectSliderButton) => {
    dispatch({ type: 'SET_CURRENT', payload: button });
  };

  return (
    <div className={styles.container}>
      <div className={styles.digits}>
        <p 
          ref={startYearRef} 
          className={clsx(styles.text, styles.start)}
        >
          {startYearValue}
        </p>
        <p 
          ref={endYearRef} 
          className={clsx(styles.text, styles.end)}
        >
          {endYearValue}
        </p>
      </div>
      
      <div
        className={styles.circle}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {buttons.map((button, index) => {
          const angle = (360 / buttons.length) * index - 60;
          return (
            <button
              key={button.id}
              className={clsx(styles.button, currentIndex === index && styles.active)}
              style={{
                '--angle': `${angle}deg`,
                '--index': index,
                '--rotation': `${rotation}deg`
              } as React.CSSProperties}
              onClick={() => handleButtonClick(button)}
              title={button.id.toString()}
            >
              {button.id}
            </button>
          );
        })}
      </div>
    </div>
  );
};