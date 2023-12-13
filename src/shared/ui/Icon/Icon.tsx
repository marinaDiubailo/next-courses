import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGAttributes<SVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
    clickable: true;
    onClick: () => void;
}
type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps): JSX.Element => {
    const { className, Svg, clickable, ...otherProps } = props;

    const icon = (
        <Svg
            className={classNames(cls.icon, {}, [className])}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={classNames(cls.button, {}, [className])}
                onClick={props.onClick}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
