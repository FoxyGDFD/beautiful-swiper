import clsx from "clsx"
import * as styles from './Button.module.scss'
import {
  type ComponentPropsWithRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type PropsWithChildren,
} from 'react';

export type ButtonProps = PropsWithChildren & ComponentPropsWithoutRef<'button'> & {
  ref?: ComponentPropsWithRef<'button'>['ref'];
};

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref'];
export const Button = ({ children, className, ...props }: ButtonProps) => {
  return <button className={clsx(styles.button, className)} {...props}>{children}</button>
}