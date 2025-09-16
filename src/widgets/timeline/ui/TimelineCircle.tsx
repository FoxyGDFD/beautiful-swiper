import { useSliderSelector, type SelectSliderButton } from '@shared/store/useSliderSelector';
import styles from './TimelineCircle.module.scss'
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

type TimelineCircleProps = {
  buttons: SelectSliderButton[];
};

export const TimelineCircle = ({ buttons }: TimelineCircleProps) => {
  const { currentItem, currentIndex, dispatch } = useSliderSelector();

  const [rotation, setRotation] = useState(0);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    if (currentIndex !== -1 && currentIndex !== prevIndexRef.current) {
      const angleStep = 360 / buttons.length;
      const diff = currentIndex - prevIndexRef.current;

      setRotation(prev => prev - diff * angleStep);
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex, buttons]);

  const handleButtonClick = (button: SelectSliderButton) => {
    dispatch({ type: 'SET_CURRENT', payload: button });
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.circle}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {buttons.map((button, index) => {
          const angle = (360 / buttons.length) * index - 60;
          return (
            <button
              key={button.id}
              className={clsx(styles.button, currentItem?.id === button.id && styles.active)}
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
