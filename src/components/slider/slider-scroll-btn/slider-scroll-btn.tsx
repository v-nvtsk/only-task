import type { RefObject } from "react";
import { classnames } from "@utils/classnames";
import { ArrowIcon } from "@components/arrow-icon";
import * as styles from './style.module.css';

interface ButtonProps{
  isVisible: boolean,
  onClick: () => unknown,
  className?: string,
  refLink: RefObject<HTMLButtonElement | null>
}

export const SliderScrollButton = ({ isVisible, onClick, className = "", refLink }: ButtonProps) => (
  <div className={styles.buttonWrapper}>
    {isVisible ? 
      <button ref={refLink}
        className={classnames(styles.btn, className)}
        onClick={onClick}>
        <ArrowIcon/>
      </button>
      : null}
  </div>
);