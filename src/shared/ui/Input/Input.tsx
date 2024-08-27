import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

import clsx from 'clsx'

import s from './Input.module.scss'

import { ErrorMessage } from '../ErrorMessage/ErrorMessage'

export type InputProps = {
  error?: FieldError
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<ElementRef<'input'>, InputProps>((props, ref) => {
  const { className, error, ...rest } = props

  return (
    <div className={clsx(s.wrapper, className)}>
      <input className={clsx(s.base, s.input, error?.message && s.error)} ref={ref} {...rest} />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  )
})

Input.displayName = 'Input'
