import Icons from '@/components/Icons'
import UserAuthForm from '@/components/UserAuthForm'
import { buttonVariants } from '@/components/ui/Button'
import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import { Metadata } from 'next'
import Link from 'next/link'
import { FC } from 'react'

export const metadata: Metadata = {
  title: 'Silimarity API | Login',
  description: 'Free & open-source text similarity API',
}

const page: FC = ({}) => {
  return (
    <div className="absolute inset-0 mx-auto container flex h-screen flex-col justify-center items-center gap-8">
      <div className="flex flex-col items-center gap-6">
        <Link
          href="/"
          className={buttonVariants({ variant: 'ghost', className: 'w-fit' })}
        >
          <Icons.ChevronLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <LargeHeading>Welcome to Text Similarity</LargeHeading>
        <Paragraph>Please sign in using your Google account.</Paragraph>
      </div>
      <UserAuthForm />
    </div>
  )
}

export default page
