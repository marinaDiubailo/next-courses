import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

import clsx from 'clsx'

import inputClassNames from '../Input/Input.module.scss'
import s from './Textarea.module.scss'

import { ErrorMessage } from '../ErrorMessage/ErrorMessage'

export type TextareaProps = {
  error?: FieldError
} & ComponentPropsWithoutRef<'textarea'>

export const Textarea = forwardRef<ElementRef<'textarea'>, TextareaProps>((props, ref) => {
  const { className, error, ...rest } = props

  const classNames = {
    textarea: clsx(inputClassNames.base, s.textarea, error?.message && inputClassNames.error),
    wrapper: clsx(inputClassNames.wrapper, className),
  }

  return (
    <div className={classNames.wrapper}>
      <textarea className={classNames.textarea} ref={ref} {...rest} />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  )
})

Textarea.displayName = 'Textarea'
