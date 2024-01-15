import React from 'react'

import CountdownTimer from '@/components/timer/TimerComponent'
import { plmApiUrl } from '@/config'

const TimerPage = async () => {
  return (
    <div>
      <CountdownTimer />
    </div>
  )
}

export default TimerPage