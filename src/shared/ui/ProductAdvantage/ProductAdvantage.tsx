import { classNames } from '@/shared/lib/classNames/classNames';
import CheckIcon from '../../assets/icons/elipse.svg';
import { Icon } from '../Icon';
import cls from './ProductAdvantage.module.scss';

interface ProductAdvantageProps {
    className?: string;
    title: string;
    description: string;
}

export const ProductAdvantage = (props: ProductAdvantageProps) => {
    const { className, title, description } = props;

    return (
        <li className={classNames(cls.advantage, {}, [className])}>
            <Icon Svg={CheckIcon} />
            <div className={cls.title}>{title}</div>
            <hr className={cls.line} />
            <div className={cls.description}>{description}</div>
        </li>
    );
};

ProductAdvantage.displayName = 'ProductAdvantage';
