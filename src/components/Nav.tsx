'use client'
import Link from 'next/link'
import React from 'react'

import { UserButton, useUser } from '@clerk/nextjs'

const Nav = () => {
  const { user, isLoaded } = useUser()
  return (
    <header>
      <nav className='flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-r-0 border-b-gray-600' arial-label='Global'>
        <div className='flex lg:flex-1'>
          <a href='/' className='-m-1.5 p-1.5'>
            Home
          </a>
        </div>
        <div className='lg:flex-1'>
          <Link href='/tasks'>Tasks</Link>
        </div>
        <div className='lg:flex-1'>
          <Link href='/tasks'>Personal Notes</Link>
        </div>
        <div className='lg:flex-1'>
          <Link href='/tasks'>Alarms</Link>
        </div>
        <div className='lg:flex-1'>
          <Link href='/tasks'>Timer</Link>
        </div>
        {
          isLoaded && user && (
            <>
              <UserButton afterSignOutUrl='/' />
            </>
        )}
      </nav>
    </header>
  )
}

export default Nav