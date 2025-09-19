interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'A Search Engine',
    description: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
  },
  {
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
  {
    title: 'A Simple Approach to Product Manager Interviews',
    description: `A comprehensive guide to mastering product management interviews. This book provides practical frameworks, real-world examples, and proven strategies to help aspiring product managers succeed in their interview journey. Available on Amazon as an eBook.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://www.amazon.com/Simple-Approach-Product-Manager-Interviews-ebook/dp/B0FF1MSDWD/',
  },
]

export default projectsData
