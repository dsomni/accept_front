import styles from './menu.module.css';
import { FC, useState, ReactNode, useEffect, useCallback, useRef } from 'react';

export const Menu: FC<{
  links: ReactNode;
  buttonText: string;
  buttonClass: string;
  linksClass: string;
}> = ({ buttonText, buttonClass, links, linksClass, children }) => {
  const [show, setShow] = useState(false);
  const dropDown = useRef<HTMLDivElement>(null);

  const clickHandler = useCallback(
    (event) => {
      if (event.target == dropDown.current) {
        setShow((show) => !show);
      } else {
        setShow(false);
      }
    },
    [setShow, dropDown]
  );

  useEffect(() => {
    window.addEventListener('click', clickHandler);
    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, [clickHandler]);
  return (
    <div className={styles.dropdown}>
      <div ref={dropDown} className={styles.dropbtn + ' ' + buttonClass}>
        {buttonText}
      </div>
      {show && (
        <div className={styles.dropdownContent + ' ' + linksClass}>{links}</div>
      )}
    </div>
  );
};
