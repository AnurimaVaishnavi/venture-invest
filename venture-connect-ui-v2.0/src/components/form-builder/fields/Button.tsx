import { cva, type VariantProps } from 'class-variance-authority';
import {forwardRef} from 'react'
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors rounded-md text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
              default:
                'bg-primary text-primary-foreground shadow hover:bg-primary/90',
              destructive:
                'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
              outline:
                'border bg-transparent shadow-sm hover:bg-secondary hover:text-secondary-foreground',
              secondary:
                'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
              ghost: 'hover:bg-secondary hover:text-secondary-foreground',
              link: 'text-primary underline-offset-4 hover:underline',
            },
            size : {
              icon: 'h-9 w-9',
              default: 'h-9 px-4 py-2',
              sm: 'h-8 rounded-md px-3 text-xs',
              lg: 'h-10 rounded-md px-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },

);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function MyInput({className,
  variant,
  size,
  disabled,
  isLoading,
  children,
  asChild = false,
  ...props}, ref) {
    const { label, ...otherProps } = props;
    return (
      <label>
        {label}
        <input {...otherProps} ref={ref} />
      </label>
    );
  });
  
export { Button, buttonVariants };