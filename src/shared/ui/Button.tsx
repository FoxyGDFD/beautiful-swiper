import clsx from "clsx"
import type { ButtonHTMLAttributes } from "react"
import styles from './Button.module.scss'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return <button className={clsx(styles.button, className)} {...props}>{children}</button>
}