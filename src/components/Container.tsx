import clsx from 'clsx'

export function Container({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx('lg:px-16', className)} {...props}>
      <div>
        <div className="mx-auto px-4 sm:px-6 md:px-4 lg:px-8">{children}</div>
      </div>
    </div>
  )
}
