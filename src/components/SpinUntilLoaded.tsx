import { SpinUntilLoadedProps, SpinUntilLoadedTypes } from '@/types'

const SpinUntilLoaded = ({ isLoading, children, className = ' ', type = SpinUntilLoadedTypes.primary, ...props }: SpinUntilLoadedProps): JSX.Element => {
    if (isLoading) {
      return (
        <div className={`spinner-border text-${type as string} ${className}`} role="status" {...props}>
          <span className="visually-hidden">Loading...</span>
        </div>
      )
    } else {
      return (
        <>
          {children}
        </>
      )
    }
  }
  
  export default SpinUntilLoaded
  