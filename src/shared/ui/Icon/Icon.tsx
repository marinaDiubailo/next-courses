import React from 'react'

import clsx from 'clsx'

import s from './Icon.module.scss'

type SvgProps = Omit<React.SVGAttributes<SVGElement>, 'onClick'>
type ClicableIconVatiant = 'primary' | 'secondary'

type IconBaseProps = {
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  className?: string
  label?: string
  variant?: ClicableIconVatiant
} & SvgProps

type NonClickableIconProps = {
  clickable?: false
} & IconBaseProps

type ClickableIconProps = {
  clickable: true

  onClick: () => void
} & IconBaseProps

type IconProps = ClickableIconProps | NonClickableIconProps

export const Icon = (props: IconProps) => {
  const { Svg, className, clickable, label, variant = 'primary', ...otherProps } = props

  const icon = <Svg className={clsx(s.icon, className)} {...otherProps} onClick={undefined} />

  if (clickable) {
    return (
      <button
        aria-label={label}
        className={clsx(s.button, s[variant], className)}
        onClick={props.onClick}
        type={'button'}
      >
        <Svg className={s.icon} />
      </button>
    )
  }

  return icon
}

Icon.displayName = 'Icon'
