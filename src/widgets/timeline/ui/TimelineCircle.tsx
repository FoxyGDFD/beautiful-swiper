import styles from './TimelineCircle.module.scss'

type TimelineCircleProps = {
  buttons: {id: number | string}[];
}
export const TimelineCircle = ({buttons}: TimelineCircleProps) => {

    const handleButtonClick = (buttonId: number) => {
    console.log(`Клик по кнопке: ${buttonId}`);
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
              onClick={() => handleButtonClick(button.id)}
              title={button.id.toString()}
            >
              {button.id}
            </button>
          );
        })}
      </div>
    </div>
}