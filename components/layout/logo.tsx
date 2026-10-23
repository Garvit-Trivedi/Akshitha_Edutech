import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  inverted?: boolean
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn('flex min-w-0 shrink-0 items-center', className)} aria-label="Akshitha Edutech home">
      <Image
        src="/images/akshitha-edutech-logo.png"
        alt="Akshitha Edutech"
        width={520}
        height={180}
        priority
        className="h-12 w-[11.5rem] max-w-[40vw] rounded-md object-contain object-left lg:h-14 lg:w-[13rem]"
      />
    </Link>
  )
}
