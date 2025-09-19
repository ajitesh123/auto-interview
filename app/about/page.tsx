import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
import GitHubCalendar from '@/components/GitHubCalendar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <Header />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
        <div className="mt-10">
          <GitHubCalendar username="ajitesh123" />
        </div>
      </AuthorLayout>
      <Footer />
    </>
  )
}
