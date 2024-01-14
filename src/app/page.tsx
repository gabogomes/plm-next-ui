import Image from 'next/image'
import { redirect } from 'next/navigation'

import { auth } from '@clerk/nextjs'

const Home = () => {
  const { userId } = auth()
  if (userId) {
    redirect('/tasks')
  }
  return (
    <main className="">
      <h1>
        Next.js Auth Tutorial
      </h1>
    </main>
  )
}
export default Home
