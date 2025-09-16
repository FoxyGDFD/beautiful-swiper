import { useSliderSelector, type SelectSliderButton } from '@shared/store/useSliderSelector';
import styles from './TimelineCircle.module.scss'

type TimelineCircleProps = {
  buttons: SelectSliderButton[];
}
export const TimelineCircle = ({buttons}: TimelineCircleProps) => {
  const {currentItem, dispatch} = useSliderSelector();

  const handleButtonClick = (button: SelectSliderButton) => {
    dispatch({type: 'SET_CURRENT', payload: button})
    console.log(`Клик по кнопке: ${JSON.stringify(currentItem)}`);
  };

  return <div className={styles.container}>
      <div className={styles.circle}>
        {buttons.map((button, index) => {
          const angle = (360 / buttons.length) * index - 120;
          return (
            <button
              key={button.id}
              className={styles.button}
              style={{ 
                '--angle': `${angle}deg`,
                '--index': index 
              }}
              onClick={() => handleButtonClick(button)}
              title={button.id.toString()}
            >
              {button.id}
            </button>
          );
        })}
      </div>
    </div>
}