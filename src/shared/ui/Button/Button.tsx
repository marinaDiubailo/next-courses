import type { ComponentProps, ReactNode, FC } from 'react';
import clsx from 'clsx';

import s from './Button.module.scss';

type ButtonProps = {
  variant?: 'primary' | 'ghost' | 'icon';
  addon?: ReactNode;
  addonDown?: boolean;
  small?: boolean;
} & ComponentProps<'button'>;

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    addon,
    small = false,
    variant = 'primary',
    addonDown = false,
    ...rest
  } = props;

  const classNames = {
    button: clsx(s.button, className, s[variant], small && s.small),
    addon: clsx(s.addon, addonDown && s.down),
  };

  return (
    <button className={classNames.button} {...rest}>
      {children}
      {addon && <div className={classNames.addon}>{addon}</div>}
    </button>
  );
};

Button.displayName = 'Button';
