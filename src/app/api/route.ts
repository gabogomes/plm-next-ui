import { NextResponse } from 'next/server'

import { auth } from '@clerk/nextjs'

export const GET = async (request: Request, context:any) => {
  const {userId} = auth()
 
  if(!userId){
    return new Response("Unauthorized", { status: 401 })
  }
 
  const data = { message: 'Hello World' }
 
  return NextResponse.json({ data })
}