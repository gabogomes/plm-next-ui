import axios from 'axios'
import { NextResponse } from 'next/server'

import { plmApiUrl } from '@/config'
import { auth, currentUser } from '@clerk/nextjs'

export const POST = async (request: Request) => {
  try {
    const { userId } = auth()
    const { body } = await request.json()
    const user = await currentUser()
    const correspondenceEmailAddress = user?.emailAddresses[0].emailAddress
    const updatedBody = { ...body, correspondenceEmailAddress }

    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const response = await axios.post(`${plmApiUrl}/v1/tasks/${userId as string}`, updatedBody)
    return NextResponse.json(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error
      if (response) {
        const errorMessage = response.data.detail[0].message

        return new Response(errorMessage, {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        })
      }
    }

    throw error
  }
}

export const GET = async () => {

  const { userId } = auth()

  const results = await axios.get(`${plmApiUrl}/v1/tasks/${userId as string}`)
  
  return NextResponse.json(results.data)

}