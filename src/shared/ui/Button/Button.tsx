/* eslint-disable react/display-name */
import { type ElementType, type ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import s from './Button.module.scss'

import { PolymorphPropsWithRef, PolymorphRef } from '../../types/polymorph'

type ElementProps = {
  addon?: ReactNode
  addonDown?: boolean
  small?: boolean
  variant?: 'ghost' | 'icon' | 'primary'
}

type TagComponent = <T extends ElementType = 'button'>(
  props: PolymorphPropsWithRef<T, ElementProps>
) => ReactNode

const ButtonPolymorph: TagComponent = forwardRef(
  <T extends ElementType = 'button'>(props: PolymorphPropsWithRef<T>, ref?: PolymorphRef<T>) => {
    const {
      addon,
      addonDown = false,
      as: Tag = 'button',
      children,
      className,
      disabled,
      small = false,
      variant = 'primary',
      ...rest
    } = props

    const classNames = {
      addon: clsx(s.addon, addonDown && s.down),
      button: clsx(
        s.button,
        s[variant],
        small && s.small,
        className,
        disabled && 'href' in rest && s.disabled
      ),
    }

    return (
      <Tag className={classNames.button} disabled={disabled} ref={ref} {...rest}>
        {children}
        {addon && <div className={classNames.addon}>{addon}</div>}
      </Tag>
    )
  }
)

export const Button = ButtonPolymorph
