import { FC, memo } from 'react';
import { BurgerProps, Burger as MantineBurger } from '@mantine/core';
// import styles from './burger.module.scss'

const Burger: FC<BurgerProps> = ({ ...props }) => {
  return <MantineBurger {...props} />;
};

export default memo(Burger);
