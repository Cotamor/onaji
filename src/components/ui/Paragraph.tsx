import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React, { FC, HTMLAttributes } from 'react'

const paragraphVariants = cva(
  'max-w-prose text-slate-700 dark:text-slate-300 text-center',
  {
    variants: {
      size: {
        default: 'text-base sm:text-lg',
        sm: 'text-sm, sm: text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

interface ParagraphProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph: FC<ParagraphProps> = React.forwardRef<
  HTMLParagraphElement,
  ParagraphProps
>(({ className, size, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      {...props}
      className={cn(paragraphVariants({ size, className }))}
    >
      {children}
    </p>
  )
})

Paragraph.displayName = 'Paragraph'

export default Paragraph
