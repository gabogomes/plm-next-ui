import axios from 'axios'
import { NextResponse } from 'next/server'

import { plmApiUrl } from '@/config'
import { auth, currentUser } from '@clerk/nextjs'

export const POST = async (request: Request) => {

  const { userId } = auth()
  const { body } = await request.json()
  const user = await currentUser()
  const correspondenceEmailAddress = user?.emailAddresses[0].emailAddress
  const updatedBody = { ...body, correspondenceEmailAddress, userId }
 
  if(!userId){
    return new Response("Unauthorized", { status: 401 })
  }
 
  const response = await axios.post(`${plmApiUrl}/v1/tasks`, updatedBody)
  return NextResponse.json(response.data)
}

export const GET = async () => {

  const { userId } = auth()

  const results = await axios.get(`${plmApiUrl}/v1/tasks/${userId as string}`)
  
  return NextResponse.json(results.data)

}