import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGAttributes<SVGElement>, 'onClick'>;
type ClicableIconVatiant = 'primary' | 'secondary';

interface IconBaseProps extends SvgProps {
    className?: string;
    variant?: ClicableIconVatiant;
    label?: string;
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

export const Icon = (props: IconProps) => {
    const {
        className,
        Svg,
        clickable,
        label,
        variant = 'primary',
        ...otherProps
    } = props;

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
                aria-label={label}
                type="button"
                className={classNames(cls.button, {}, [
                    className,
                    cls[variant],
                ])}
                onClick={props.onClick}
            >
                <Svg className={cls.icon} />
            </button>
        );
    }

    return icon;
};

Icon.displayName = 'Icon';
