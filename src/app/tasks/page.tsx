'use client'
import LoadingOverlay from 'react-loading-overlay-ts'
import { SWRResponse } from 'swr'

import useSwr from '@/utils/swr'
import { useAuth } from '@clerk/nextjs'

const Example = () => {
  const { isLoaded, userId, sessionId } = useAuth()
  const { data: taskData, error: taskError, isLoading: taskIsLoading } = useSwr(`/api`) as SWRResponse<any, any, boolean>

 
  if (!isLoaded || !userId) {
    return null
  }
 
  return (
    <div>
      Hello, {userId} your current active session is {sessionId}
      <LoadingOverlay className='h-100' active={taskIsLoading}>
        <div>
          {JSON.stringify(taskData)}
        </div>
      </LoadingOverlay>
    </div>
  )
}

export default Example