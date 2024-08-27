import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Icon.module.scss'

type SvgProps = Omit<React.SVGAttributes<SVGElement>, 'onClick'>
type ClicableIconVatiant = 'primary' | 'secondary'

interface IconBaseProps extends SvgProps {
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  className?: string
  label?: string
  variant?: ClicableIconVatiant
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true

  onClick: () => void
}

type IconProps = ClickableIconProps | NonClickableIconProps

export const Icon = (props: IconProps) => {
  const { Svg, className, clickable, label, variant = 'primary', ...otherProps } = props

  const icon = (
    <Svg className={classNames(cls.icon, {}, [className])} {...otherProps} onClick={undefined} />
  )

  if (clickable) {
    return (
      <button
        aria-label={label}
        className={classNames(cls.button, {}, [className, cls[variant]])}
        onClick={props.onClick}
        type={'button'}
      >
        <Svg className={cls.icon} />
      </button>
    )
  }

  return icon
}

Icon.displayName = 'Icon'
