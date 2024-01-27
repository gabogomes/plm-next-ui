import axios from 'axios'
import { NextResponse } from 'next/server'

import { plmApiUrl } from '@/config'
import { auth, currentUser } from '@clerk/nextjs'

export const PATCH = async (request: Request, context: any) => {
  try {
    const { params } = context
    const { userId } = auth()
    const { body } = await request.json()
  
    if(!userId){
      return new Response("Unauthorized", { status: 401 })
    }

    const response = await axios.patch(`${plmApiUrl}/v1/tasks/${userId as string}/${params.taskId as number}`, body)
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


export const GET = async (request: Request, context: any) => {

  const { params } = context
  const taskId = params.taskId
  const { userId } = auth()

  const results = await axios.get(`${plmApiUrl}/v1/tasks/${userId as string}/${taskId as number}`)
  
  return NextResponse.json(results.data)

}

export const DELETE = async (request: Request, context: any) => {

  try {
    const { params } = context
    const taskId = params.taskId
    const { userId } = auth()

    const results = await axios.delete(`${plmApiUrl}/v1/tasks/${userId as string}/${taskId as number}`)
    
    return NextResponse.json(results.data)
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

export const POST = async (request: Request, context: any) => {
  try {
    const { params } = context
    const taskId = params.taskId
    const { userId } = auth()
    const { body } = await request.json()
    const user = await currentUser()
    const correspondenceEmailAddress = user?.emailAddresses[0].emailAddress
    const updatedBody = { ...body, correspondenceEmailAddress }

    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const response = await axios.post(`${plmApiUrl}/v1/tasks/${userId as string}/${taskId as number}/personal-notes`, updatedBody)
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