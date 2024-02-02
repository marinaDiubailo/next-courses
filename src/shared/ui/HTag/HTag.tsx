import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './HTag.module.scss';

type HeaderTagType = 'h1' | 'h2' | 'h3';

interface HTagProps {
    tag: HeaderTagType;
    children: ReactNode;
    className?: string;
}

const mapTagToClass: Record<HeaderTagType, string> = {
    h1: cls['h1'],
    h2: cls['h2'],
    h3: cls['h3'],
};

export const HTag = memo((props: HTagProps): JSX.Element => {
    const { children, tag, className } = props;

    const HeaderTag = tag;
    const classFromTag = mapTagToClass[tag];

    return (
        <HeaderTag className={classNames('', {}, [className, classFromTag])}>
            {children}
        </HeaderTag>
    );
});

HTag.displayName = 'HTag';
