import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from '../Main'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function BlogPage() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <>
      <Header />
      <Main posts={posts} />
      <Footer />
    </>
  )
}
