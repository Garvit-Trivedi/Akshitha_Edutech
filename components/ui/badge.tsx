import * as React from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' }) { return <div className={cn('inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', variant === 'secondary' ? 'border-transparent bg-secondary text-secondary-foreground' : 'border-transparent bg-primary text-primary-foreground', className)} {...props} /> }
