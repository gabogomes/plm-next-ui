'use client'
import { useState } from 'react'
import LoadingOverlay from 'react-loading-overlay-ts'
import { SWRResponse } from 'swr'

import TaskCreationModal from '@/components/tasks/TaskCreationModal' // Import your modal component here
import useSwr from '@/utils/swr'
import { useAuth } from '@clerk/nextjs'

import styles from '../../../styles/TasksPage.module.css' // Import CSS module styles

const TasksPage = () => {
  const { isLoaded, userId, sessionId } = useAuth()
  const { data: taskData, error: taskError, isLoading: taskIsLoading } =
    useSwr(`/api/tasks/${userId}`) as SWRResponse<any, any, boolean>

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  if (!isLoaded || !userId) {
    return null
  }

  return (
    <div>
      <button className={styles.addTaskButton} onClick={openModal}>
        Add Task
      </button>
      <LoadingOverlay className="h-100" active={taskIsLoading}>
        <div>{JSON.stringify(taskData)}</div>
      </LoadingOverlay>
      
      {isModalOpen && (
        <TaskCreationModal closeModal={closeModal} />
      )}
    </div>
  )
}

export default TasksPage