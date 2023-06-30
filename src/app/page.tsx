import LargeHeading from '@/components/ui/LargeHeading'
import Paragraph from '@/components/ui/Paragraph'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'


export const metadata: Metadata = {
  title: 'Silimarity API | Home',
  description: 'Free & open-source text similarity API',
}

export default function Home() {
  return (
    <div className="h-screen ">
      <div className="container pt-32 max-w-7xl w-full mx-auto h-full">
        <div className="w-full h-full flex flex-col lg:flex-row">
          <div className="w-full flex flex-col lg:flex-1 lg:justify-center">
            <LargeHeading
              className="three-d text-black dark:text-light-gold"
              size="lg"
            >
              Easily determine <br /> text similarity.
            </LargeHeading>
            <Paragraph className="max-w-xl lg:text-left mx-auto mt-8">
              With the Text Sililarity API, you can easily determin the
              similarity between two pieces of text with a free{' '}
              <Link
                href="/login"
                className="underline underline-offset-2 text-black dark:text-light-gold"
              >
                API key
              </Link>
              .
            </Paragraph>
          </div>

          <div className="relative w-full h-3/5 my-auto lg:flex-1 ">
            <Image
              priority
              className='img-shadow'
              alt="typewriter"
              src="/antique-books.png"
              fill
              quality={100}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
