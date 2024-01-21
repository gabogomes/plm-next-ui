'use client'
 
import { usePathname } from 'next/navigation'

const Page = () => {
  const pathname = usePathname()
  const initialPath = pathname.split('~')[0]
  return (
    <div>
      <h1>Hello, this path is {initialPath}</h1>
    </div>
  )
}

export default Page