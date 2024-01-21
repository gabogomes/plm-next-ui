import { useCallback, useState } from 'react'

interface PagingInfoState {
  offset: number
  limit: number
}

interface UsePagingInfoReturn {
  pagingInfo: PagingInfoState
  setOffset: (offset: number) => void
  setLimit: (limit: number) => void
}

const usePagingInfo = (initialState: PagingInfoState): UsePagingInfoReturn => {
  const [pagingInfo, setPagingInfo] = useState<PagingInfoState>(initialState)

  const setOffset = useCallback(
    (offset: number) => {
      setPagingInfo((prevState) => ({ ...prevState, offset }))
    },
    []
  )

  const setLimit = useCallback(
    (limit: number) => {
      setPagingInfo((prevState) => ({
        ...prevState,
        offset: 0,
        limit
      }))
    },
    []
  )

  return { pagingInfo, setOffset, setLimit }
}

export default usePagingInfo
