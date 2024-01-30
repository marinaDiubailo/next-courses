import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps
    extends Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
    > {
    className?: string;
    children: ReactNode;
    variant?: 'primary' | 'ghost';
    addon?: ReactNode;
    small?: boolean;
    addonDown?: boolean;
}

export const Button = memo((props: ButtonProps): JSX.Element => {
    const {
        className,
        children,
        addon,
        small = false,
        variant = 'primary',
        addonDown = false,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls['with-addon']]: Boolean(addon),
        [cls.small]: small,
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            className={classNames(cls.button, mods, [className, cls[variant]])}
            {...otherProps}
        >
            {children}
            {addon && (
                <div
                    className={classNames(cls.addon, {
                        [cls['down']]: addonDown,
                    })}
                >
                    {addon}
                </div>
            )}
        </motion.button>
    );
});
