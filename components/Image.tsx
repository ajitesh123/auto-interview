import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

// Enhanced Image component with SEO optimizations
// Next.js Image component already implements lazy loading by default
const Image = ({ src, alt, loading = 'lazy', ...rest }: ImageProps) => (
  <NextImage 
    src={`${basePath || ''}${src}`} 
    alt={alt || ''} // Google SEO: Always provide alt text
    loading={loading} // Explicit lazy loading for better SEO
    {...rest} 
  />
)

export default Image
