import { cn } from '@/lib/utils'

export const inputClass =
  'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive'

type FieldProps = {
  label: string
  name: string
  error?: string
  hint?: string
  className?: string
} & (
  | ({ as?: 'input' } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({ as: 'textarea' } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
  | ({ as: 'select'; options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>)
)

export function FormField(props: FieldProps) {
  const { label, name, error, hint, className } = props
  const id = `field-${name}`
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const common = { id, name, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy }

  let control: React.ReactNode
  if (props.as === 'textarea') {
    const { as: _as, label: _l, error: _e, hint: _h, className: _c, ...rest } = props
    control = <textarea {...rest} {...common} className={cn(inputClass, 'h-auto min-h-28 py-2')} />
  } else if (props.as === 'select') {
    const { as: _as, label: _l, error: _e, hint: _h, className: _c, options, ...rest } = props
    control = (
      <select {...rest} {...common} className={inputClass}>
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    )
  } else {
    const { as: _as, label: _l, error: _e, hint: _h, className: _c, ...rest } = props
    control = <input {...rest} {...common} className={inputClass} />
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {props.required && (
          <span className="text-destructive" aria-hidden="true">
            {' *'}
          </span>
        )}
      </label>
      {control}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function SuccessMessage({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div role="status" className="rounded-xl border border-success/30 bg-success/10 p-6 text-center">
      <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
      {children && <div className="mt-2 text-sm text-muted-foreground">{children}</div>}
    </div>
  )
}
