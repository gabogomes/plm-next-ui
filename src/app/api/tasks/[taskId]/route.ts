import axios from 'axios'
import { NextResponse } from 'next/server'

import { plmApiUrl } from '@/config'
import { auth, currentUser } from '@clerk/nextjs'

export const PATCH = async (request: Request, context: any) => {

  const { params } = context
  const { userId } = auth()
  const { body } = await request.json()
 
  if(!userId){
    return new Response("Unauthorized", { status: 401 })
  }

  const response = await axios.patch(`${plmApiUrl}/v1/tasks/${userId as string}/${params.taskId as number}`, body)
  return NextResponse.json(response.data)
}

export const GET = async (request: Request, context: any) => {

  const { params } = context
  const taskId = params.taskId
  const { userId } = auth()

  const results = await axios.get(`${plmApiUrl}/v1/tasks/${userId as string}/${taskId as number}`)
  
  return NextResponse.json(results.data)

}

export const DELETE = async (request: Request, context: any) => {

  const { params } = context
  const taskId = params.taskId
  const { userId } = auth()

  const results = await axios.delete(`${plmApiUrl}/v1/tasks/${userId as string}/${taskId as number}`)
  
  return NextResponse.json(results.data)
}