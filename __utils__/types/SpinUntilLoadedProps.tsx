
export interface SpinUntilLoadedProps {
    isLoading: boolean
    children: JSX.Element | JSX.Element[] | string | null
    className?: string
    type?: SpinUntilLoadedTypes
  }
  
  export enum SpinUntilLoadedTypes {
    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    danger = 'danger',
    warning = 'warning',
    info = 'info',
    light = 'light',
    dark = 'dark',
  }
  