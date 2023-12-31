import { authOptions } from '@/lib/auth'
import SignInButton from '@/ui/SignInButton'
import SignOutButton from '@/ui/SignOutButton'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { buttonVariants } from './ui/Button'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex items-center justify-center md:justify-between">
        <Link
          href="/"
          className={buttonVariants({
            variant: 'link',
            className: 'hidden md:flex',
          })}
        >
          Onaji 1.0
        </Link>

        <div className="flex gap-4">
          <Link
            href="/"
            className={buttonVariants({
              variant: 'link',
              className: 'md:hidden text-lg',
            })}
          >
            Onaji
          </Link>
          <ThemeToggle />
          <Link
            href="/documentation"
            className={buttonVariants({ variant: 'ghost' })}
          >
            Docs
          </Link>

          {session ? (
            <>
              <Link
                className={buttonVariants({ variant: 'ghost' })}
                href="/dashboard"
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
