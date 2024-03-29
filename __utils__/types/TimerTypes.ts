export interface TimerBoxProps {
  milliseconds: number
  seconds: number
  minutes: number
  hours: number
  changeSeconds: (event: React.ChangeEvent<HTMLInputElement>) => void
  changeMinutes: (event: React.ChangeEvent<HTMLInputElement>) => void
  changeHours: (event: React.ChangeEvent<HTMLInputElement>) => void
}
  
export interface EndScreen {
  show: boolean
  message: string
}

export interface TimerEventChange extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement
}