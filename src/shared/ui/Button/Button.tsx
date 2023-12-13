import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: ReactNode;
    variant?: 'primary' | 'ghost';
    addon?: ReactNode;
    addonDown?: boolean;
}

export const Button = memo((props: ButtonProps): JSX.Element => {
    const {
        className,
        children,
        addon,
        variant = 'primary',
        addonDown = false,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls['with-addon']]: Boolean(addon),
    };

    return (
        <button
            {...otherProps}
            className={classNames(cls.button, mods, [className, cls[variant]])}
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
        </button>
    );
});
