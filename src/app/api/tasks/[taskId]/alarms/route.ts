import axios from 'axios'
import { NextResponse } from 'next/server'

import { plmApiUrl } from '@/config'
import { auth, currentUser } from '@clerk/nextjs'

export const POST = async (request: Request, context: any) => {
  try {
    const { params } = context
    const taskId = params.taskId
    const { userId } = auth()
  
    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const response = await axios.post(`${plmApiUrl}/v1/emails/${userId as string}/${taskId as number}`)
    return NextResponse.json(response.data.message)
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