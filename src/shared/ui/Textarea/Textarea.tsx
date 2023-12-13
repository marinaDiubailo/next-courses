import { TextareaHTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export const Textarea = memo((props: TextareaProps): JSX.Element => {
    const { className, ...otherProps } = props;

    return (
        <textarea
            className={classNames(cls.textarea, {}, [className])}
            {...otherProps}
        />
    );
});
