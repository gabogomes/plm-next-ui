'use client'
import { useState } from 'react'

import styles from '../../../styles/TasksPage.module.css'

type ModalProps = {
  closeModal: () => void;
};

const Modal = ({ closeModal }: ModalProps) => {
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskType, setTaskType] = useState('');

  const handleTaskSubmit = () => {
    // Handle task submission logic here
    // You can use `taskName`, `taskStatus`, `taskType` to create a new task
    // Once the task is created, you can close the modal using `closeModal`
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h1 className={styles.modalTitle}>Create New Task</h1>
        <div className={styles.formField}>
          <label htmlFor="taskName">Task Name</label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
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
  );
};

export default Modal;