import type { Period } from "@/types";
import * as styles from './style.module.css';

interface PeriodSelectorProps{
  periods: Period[],
  selected: number,
  setSelected: (n: number) => Promise<void> | void
}

export const PeriodSelector = ({ periods, selected, setSelected }: PeriodSelectorProps) => {
  const radius = 530 / 2;

  return (
    <>
      <div className={styles.wrapper}
        style={{
          '--radius': `${radius}px`,
          '--count': periods.length,
          '--selected-index': selected,
        }}>
        <div className={styles.circleContainer}>
          {
            periods.map((period: Period, index) => {
              const className = (index === selected) ? [styles.circleItem, styles.circleItemActive].join(' ') : styles.circleItem;

              return <div
                onClick={() => void setSelected(index)}
                className={className}
                key={period.title}
                style={{
                  '--index': index,
                }}>          
                <div className={styles.dot}>
                  <div className={styles.number}>{index + 1}</div>
                </div>          
                <div className={styles.circleTitle}>{period.title}</div>
              </div>;})
          }
        </div>
      </div>
    </>);
};

