import axios from 'axios'
import { NextResponse } from 'next/server'

import { plmApiUrl } from '@/config'
import { auth, currentUser } from '@clerk/nextjs'

export const GET = async (request: Request, context: any) => {

  const { params } = context
  const taskId = params.taskId
  const { userId } = auth()

  const results = await axios.get(`${plmApiUrl}/v1/tasks/${userId as string}/${taskId as number}/personal-notes`)
  
  return NextResponse.json(results.data)

}