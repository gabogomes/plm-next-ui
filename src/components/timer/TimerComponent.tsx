'use client'
import React, { useEffect, useState } from 'react'
import { BsFillPlayFill, BsPauseFill, BsStopFill } from 'react-icons/bs'

import { EndScreen, TimerEventChange } from '@/types'

import TimerBox from './TimerBox'

const CountdownTimer = () => {
  const [hours, setHours] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)
  const [milliseconds, setMilliseconds] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean | null>(null)
  const [showEndScreen, setShowEndScreen] = useState<EndScreen>({
    show: false,
    message: "Time is Up!",
  })

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1)
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
          setMilliseconds(99)
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1)
          setSeconds(59)
          setMilliseconds(99)
        } else if (hours > 0) {
          setHours((hours) => hours - 1)
          setMinutes(59)
          setSeconds(59)
          setMilliseconds(99)
        }
      }, 10)
    }

    if (hours === 0 && minutes === 0 && seconds === 0 && milliseconds === 1) {
      setShowEndScreen({ ...showEndScreen, show: true })
      resetTimer()
    }
    return () => clearInterval(interval)
  }, [milliseconds, seconds, minutes, hours, isRunning, showEndScreen])

  function resetTimer() {
    setIsRunning(false)
    setMilliseconds(0)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  }

  function startTimer() {
    if (hours !== 0 || minutes !== 0 || seconds !== 0 || milliseconds !== 0) {
      setIsRunning(true)
      setShowEndScreen({ ...showEndScreen, show: false })
    } else {
      window.alert("Add Time.")
    }
  }

  function pauseTimer() {
    setIsRunning(false)
  }

  function stopTimer() {
    resetTimer()
    setShowEndScreen({ ...showEndScreen, show: false })
  }

  const changeSeconds = (e: TimerEventChange) => {
    const parsedSeconds = parseInt(e.target.value, 10)
    setSeconds(isNaN(parsedSeconds) ? 0: parsedSeconds)
  }

  const changeMinutes = (e: TimerEventChange) => {
    const parsedMinutes = parseInt(e.target.value, 10)
    setMinutes(isNaN(parsedMinutes) ? 0 : parsedMinutes)
  }

  const changeHours = (e: TimerEventChange) => {
    const parsedHours = parseInt(e.target.value, 10)
    setHours(isNaN(parsedHours) ? 0 : parsedHours)
  }

  return (
    <div>
      {showEndScreen.show && (
        <h1 className="title text-light">{showEndScreen.message}</h1>
      )}
      <TimerBox
        milliseconds={milliseconds}
        seconds={seconds}
        minutes={minutes}
        hours={hours}
        changeSeconds={changeSeconds}
        changeMinutes={changeMinutes}
        changeHours={changeHours}
      />
      <br />
      {!isRunning && (
        <button className="btn btn-accept btn-lg" onClick={startTimer}>
          <BsFillPlayFill size={100}/>
        </button>
      )}
      {isRunning && (
        <button className="btn btn-warning btn-lg" onClick={pauseTimer}>
          <BsPauseFill size={100}/>
        </button>
      )}
      <button className="btn btn-danger btn-lg" onClick={stopTimer}>
        <BsStopFill size={100}/>
      </button>
    </div>
  )
}

export default CountdownTimer