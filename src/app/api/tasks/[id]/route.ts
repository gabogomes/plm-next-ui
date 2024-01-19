import axios from 'axios'
import { NextResponse } from 'next/server'

import { plmApiUrl } from '@/config'

export const GET = async (request: Request, context:any) => {

  const { params } = context

  const results = await axios.get(`${plmApiUrl}/field-books/${params.id as string}`)
  
  return NextResponse.json({ results })

}