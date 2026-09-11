import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <section className="min-h-screen w-full bg-[#fafafa] text-[#171717]">{children}</section>
}
