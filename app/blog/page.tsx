import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 10

export const metadata = genPageMetadata({
  title: 'Blog - Auto Interview AI | Job Preparation & Career Advice',
  description:
    'Expert guides on resume building, ATS optimization, interview preparation, product management, and career development. Free resources to help you land your dream job.',
  keywords:
    'job preparation blog, resume tips, interview guides, ATS optimization, career advice, product management, software engineering interviews, job search strategies, career development, mock interviews, resume builder, cover letter generator',
})

export default async function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
