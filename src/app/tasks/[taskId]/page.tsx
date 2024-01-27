'use client'
import axios from 'axios'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { SWRResponse } from 'swr'

import SpinUntilLoaded from '@/components/SpinUntilLoaded'
import PersonalNoteCreateModal from '@/components/tasks/PersonalNoteCreateModal'
import TaskUpdateModal from '@/components/tasks/TaskUpdateModal'
import { IPersonalNotesResponse, ITasksResponse } from '@/types'
import useSwr from '@/utils/swr'

import styles from '../../../../styles/TasksPage.module.css'

const Page = () => {
  const router = useRouter()
  const pathname = usePathname()
  const splitPathPerTilde = pathname.split('~')[0].split('/')
  const taskId = parseInt(splitPathPerTilde[splitPathPerTilde.length - 1])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreatePersonalNoteModalOpen, setIsCreatePersonalNoteModalOpen] = useState(false)
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('')
  const { data: taskData, error: taskError, isLoading: taskIsLoading, mutate } =
    useSwr(`/api/tasks/${taskId as number}`) as SWRResponse<any, any, boolean>

  const { data: personalNotesData, error: personalNotesError, isLoading: personalNotesIsLoading, mutate: personalNotesMutate } = useSwr(`/api/tasks/${taskId as number}/personal-notes`) as SWRResponse<any, any, boolean>

  const openModal = () => {
    setIsModalOpen(true)
  }

  const openCreatePersonalNoteModal = () => {
    setIsCreatePersonalNoteModalOpen(true)
  }

  const closeModal = async() => {
    setIsModalOpen(false)
    mutate()
  }

  const closeCreatePersonalNoteModal = () => {
    setIsCreatePersonalNoteModalOpen(false)
    personalNotesMutate()
  }

  const handleTaskDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${taskId as number}`)
      router.push('/tasks')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error
        setDeleteErrorMessage(response?.data)
      }
    }
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
          {deleteErrorMessage === '' ? <></> : <h2 className={styles.errorMessage}>{deleteErrorMessage}</h2>}
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
                  <td className={styles.tableCellSingleTask}>{new Date(taskData.createdOn).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td className={styles.tableCellSingleTask}>Last Modified On</td>
                  <td className={styles.tableCellSingleTask}>{new Date(taskData.modifiedOn).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          )}              
        </SpinUntilLoaded>
      </div>
      {isModalOpen && <TaskUpdateModal closeModal={closeModal} taskId={taskId} taskData={taskData} />}
      <div>
        <SpinUntilLoaded isLoading={taskIsLoading}>
          <button className={styles.addPersonalNoteButton} onClick={openCreatePersonalNoteModal}>
            Add Personal Note
          </button>
        </SpinUntilLoaded>
      </div>
      {isCreatePersonalNoteModalOpen && <PersonalNoteCreateModal closeModal={closeCreatePersonalNoteModal} taskId={taskId as number} />}
      <div style={{ position: 'absolute', top: '700px' }}>
        {personalNotesData && taskData && (
          <table className={styles.tableContainerForPersonalNotes}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Name</th>
                <th className={styles.tableHeader}>Type</th>
                <th className={styles.tableHeader}>Created On</th>
                <th className={styles.tableHeader}>Description</th>
              </tr>
            </thead>
            <tbody>
              {!personalNotesIsLoading &&
                personalNotesData.map((item: IPersonalNotesResponse) => (
                  <tr key={item.id}>
                    <td className={styles.tableCellForPersonalNote}>{item.name}</td>
                    <td className={styles.tableCellForPersonalNote}>{item.type}</td>
                    <td className={styles.tableCellForPersonalNote}>{new Date(item.createdOn).toLocaleDateString()}</td>
                    <td className={styles.tableCellForPersonalNote}>{item.note}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Page