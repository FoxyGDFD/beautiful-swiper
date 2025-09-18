import { useSliderSelector, type SelectSliderButton } from "@shared/store/useSliderSelector";
import type { TimelineCircleProps } from "./TimelineCircle";
import * as styles from './BulletNavigation.module.scss';
import clsx from "clsx";


export const BulletNavigation = ({ buttons, className }: TimelineCircleProps & { className?: string }) => {
  const { currentIndex, dispatch } = useSliderSelector();
  const handleButtonClick = (button: SelectSliderButton) => {
    dispatch({ type: 'SET_CURRENT', payload: button });
  };
  
  
  return <div className={clsx("d-flex gap-1", className)}>
        {buttons.map((button, index) => (
            <button
              key={button.id}
              className={clsx(styles.bullet, currentIndex === index && styles.active)}
              onClick={() => handleButtonClick(button)}
              title={button.id.toString()}
            >
            </button>
          )
        )}
      </div>
} 