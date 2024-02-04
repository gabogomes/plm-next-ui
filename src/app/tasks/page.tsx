'use client'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { SWRResponse } from 'swr'

import SpinUntilLoaded from '@/components/SpinUntilLoaded'
import TaskCreationModal from '@/components/tasks/TaskCreationModal'
import { ITasksResponse } from '@/types'
import useSwr from '@/utils/swr'
import { useAuth } from '@clerk/nextjs'

import styles from '../../../styles/TasksPage.module.css'

const Page = () => {
  const { isLoaded, userId, sessionId } = useAuth()
  const [emailResponseMessage, setEmailResponseMessage] = useState<AxiosResponse | null>(null)
  const { data: taskData = { items: [] }, error: taskError, isLoading: taskIsLoading, mutate } =
    useSwr(`/api/tasks`) as SWRResponse<any, any, boolean>

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = async() => {
    setIsModalOpen(false)
    mutate()
  }

  const handleSendEmail = async (taskId: number | undefined) => {
    try {
      const response = await axios.post(`/api/tasks/${taskId}/alarms`);
      setEmailResponseMessage(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
      }
    }
  };

  if (!isLoaded || !userId) {
    return null
  }

  return (
    <div>
      {emailResponseMessage && (
        <h1 className="title text-light" style={{ fontSize: '20px', color: 'green' }}>
          {emailResponseMessage.data}
        </h1>
      )}
      <button className={styles.addTaskButton} onClick={openModal}>
        Add Task
      </button>
      <SpinUntilLoaded isLoading={taskIsLoading}>
        <table className={styles.tableContainer}>
          <thead>
            {taskData.items.length == 0 ? 'Create new Tasks using the Add Task button' :
              <tr>
                <th className={styles.tableHeader}>Name</th>
                <th className={styles.tableHeader}>Type</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}>Correspondence Email</th>
                <th className={styles.tableHeader}>Notification</th>
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
                  <td className={styles.tableCell}>
                    <button className={styles.sendNotificationButton} onClick={() => handleSendEmail(item.id)}>Send Email Notification</button>
                  </td> {/* New column */}
                </tr>
            ))}
          </tbody>
        </table>
      </SpinUntilLoaded>
      {isModalOpen && <TaskCreationModal closeModal={closeModal} />}
    </div>
  )
}

export default Page