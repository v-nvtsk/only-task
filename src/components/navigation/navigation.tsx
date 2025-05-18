import { classnames } from '@utils/classnames';
import { ArrowIcon } from '@components/arrow-icon';
import * as styles from './style.module.css';

interface NavigationProps{
  selected: number,
  total: number,
  setSelected: (selected: number) => Promise<void> | void
}

export const Navigation = ({ selected, total, setSelected }: NavigationProps) => {

  const clickHandler = (n: number) => {
    void setSelected((n % total + total) % total);
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.info}>{`0${selected + 1}/0${total}`}</div>
      <div className={classnames(styles.btn, styles.prev)}
        onClick={() => clickHandler(selected - 1)}>
        <ArrowIcon/>
      </div>
      <div className={classnames(styles.btn, styles.next)}
        onClick={() => clickHandler(selected + 1)}>
        <ArrowIcon/>
      </div>
    </div>
  );
};