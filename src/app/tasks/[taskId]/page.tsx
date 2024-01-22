'use client'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SWRResponse } from 'swr'

import SpinUntilLoaded from '@/components/SpinUntilLoaded'
import TaskUpdateModal from '@/components/tasks/TaskUpdateModal'
import { ITasksResponse } from '@/types'
import useSwr from '@/utils/swr'

import styles from '../../../../styles/TasksPage.module.css'

const Page = () => {
  const router = useRouter()
  const pathname = usePathname()
  const splitPathPerTilde = pathname.split('~')[0].split('/')
  const taskId = parseInt(splitPathPerTilde[splitPathPerTilde.length - 1])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: taskData, error: taskError, isLoading: taskIsLoading, mutate } =
    useSwr(`/api/tasks/${taskId as number}`) as SWRResponse<any, any, boolean>


  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = async() => {
    setIsModalOpen(false)
    mutate()
  }

  const handleTaskDelete = async () => {
    await axios.delete(`/api/tasks/${taskId as number}`)
    router.push('/tasks')
  }

  return (
    <>
      <div>
        <SpinUntilLoaded isLoading={taskIsLoading}>
          <button className={styles.editTaskButton} onClick={openModal}>
            Edit
          </button>
          <button className={styles.deleteTaskButton} onClick={handleTaskDelete}>
            Delete
          </button>
          {taskData && (
            <table className={styles.tableContainer}>
              <thead>
                <tr>
                  <th className={styles.tableHeader}>Task Property</th>
                  <th className={styles.tableHeader}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableCellSingleTask}>Name</td>
                  <td className={styles.tableCellSingleTask}>{taskData.name}</td>
                </tr>
                <tr>
                  <td className={styles.tableCellSingleTask}>Status</td>
                  <td className={styles.tableCellSingleTask}>{taskData.status}</td>
                </tr>
                <tr>
                  <td className={styles.tableCellSingleTask}>Type</td>
                  <td className={styles.tableCellSingleTask}>{taskData.type}</td>
                </tr>
                <tr>
                  <td className={styles.tableCellSingleTask}>Correspondence Email Address</td>
                  <td className={styles.tableCellSingleTask}>{taskData.correspondenceEmailAddress}</td>
                </tr>
                <tr>
                  <td className={styles.tableCellSingleTask}>Created On</td>
                  <td className={styles.tableCellSingleTask}>{taskData.createdOn}</td>
                </tr>
                <tr>
                  <td className={styles.tableCellSingleTask}>Modified On</td>
                  <td className={styles.tableCellSingleTask}>{taskData.modifiedOn}</td>
                </tr>
              </tbody>
            </table>
          )}              
        </SpinUntilLoaded>
      </div>
      {isModalOpen && <TaskUpdateModal closeModal={closeModal} taskId={taskId} taskData={taskData} />}
    </>
  )
}

export default Page