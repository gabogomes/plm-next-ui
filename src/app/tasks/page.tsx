'use client'
import Link from 'next/link'
import { useState } from 'react'
import LoadingOverlay from 'react-loading-overlay-ts'
import { SWRResponse } from 'swr'

import TaskCreationModal from '@/components/tasks/TaskCreationModal'
import { ITasksResponse } from '@/types'
import useSwr from '@/utils/swr'
import { useAuth } from '@clerk/nextjs'

import styles from '../../../styles/TasksPage.module.css'

const Page = () => {
  const { isLoaded, userId, sessionId } = useAuth()
  const { data: taskData = { items: [], total: 0, limit: 0, offset: 0 }, error: taskError, isLoading: taskIsLoading, mutate } =
    useSwr(`/api/tasks`) as SWRResponse<any, any, boolean>

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = async() => {
    setIsModalOpen(false)
    mutate()
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
        <table className={styles.tableContainer}>
          <thead>
            {taskData.items.length == 0 ? 'Create new Tasks using the Add Task button' :
              <tr>
                <th className={styles.tableHeader}>Name</th>
                <th className={styles.tableHeader}>Type</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}>Correspondence Email</th>
              </tr>
            }            
          </thead>
          <tbody>
            {!taskIsLoading &&
              taskData.items.map((item: ITasksResponse) => (
                <tr key={item.id}>
                  <td className={styles.tableCell}>
                    <Link href={`/tasks/${item.id as number}~${(item.name as string).toLowerCase().replaceAll(' ', '_')}`}>
                      {item.name}
                    </Link>
                  </td>
                  <td className={styles.tableCell}>{item.type}</td>
                  <td className={styles.tableCell}>{item.status}</td>
                  <td className={styles.tableCell}>{item.correspondenceEmailAddress}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </LoadingOverlay>
  
      {isModalOpen && <TaskCreationModal closeModal={closeModal} />}
    </div>
  )
}

export default Page