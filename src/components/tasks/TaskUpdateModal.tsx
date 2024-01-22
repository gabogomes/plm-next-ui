'use client'
import axios from 'axios'
import { useState } from 'react'

import { ITaskRootProperties, ITasksResponse } from '@/types'

import styles from '../../../styles/TasksPage.module.css'

interface ModalProps {
  closeModal: () => void
  taskId: number
  taskData: ITasksResponse
}

const TaskUpdateModal = ({ closeModal, taskId, taskData }: ModalProps) => {
  const [taskName, setTaskName] = useState(taskData.name)
  const [taskStatus, setTaskStatus] = useState(taskData.status)
  const [taskType, setTaskType] = useState(taskData.type)
  const [errorMessage, setErrorMessage] = useState("")


  const handleTaskSubmit = async () => {
    const payload: { body: ITaskRootProperties } = {
      body: {
        name: taskName,
        status: taskStatus,
        type: taskType
      }
    }

    try {
      await axios.patch(`/api/tasks/${taskId as number}`, payload)
      closeModal()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error
        setErrorMessage(response?.data)
      }
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h1 className={styles.modalTitle}>Edit Task</h1>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p> }
        <div className={styles.formField}>
          <label htmlFor="taskName">Task Name</label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="New Task"
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="taskStatus">Task Status</label>
          <select
            id="taskStatus"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending for Revision">Pending for Revision</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className={styles.formField}>
          <label htmlFor="taskType">Task Type</label>
          <select
            id="taskType"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Studies">Studies</option>
            <option value="Well Being">Well Being</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className={styles.modalButtons}>
          <button className={styles.submitButton} onClick={handleTaskSubmit}>
            Submit
          </button>
          <button className={styles.cancelButton} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskUpdateModal