'use client'
import { IPersonalNotesRootProperties } from '__utils__/types/PersonalNoteTypes'
import axios from 'axios'
import { useState } from 'react'

import styles from '../../../styles/TasksPage.module.css'

interface ModalProps {
  closeModal: () => void
  taskId: number
}

const PersonalNoteCreateModal = ({ closeModal, taskId }: ModalProps) => {
  const [personalNoteName, setPersonalNoteName] = useState('New Personal Note')
  const [personalNoteType, setPersonalNoteType] = useState('Description')
  const [personalNoteText, setPersonalNoteText] = useState('New Personal Note')
  const [errorMessage, setErrorMessage] = useState("")


  const handlePersonalNoteSubmit = async () => {
    const payload: { body: IPersonalNotesRootProperties } = {
      body: {
        name: personalNoteName,
        type: personalNoteType,
        note: personalNoteText
      },
    }
    
    try {
      await axios.post(`/api/tasks/${taskId}`, payload)
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
        <h1 className={styles.modalTitle}>Create New Personal Note</h1>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p> }
        <div className={styles.formField}>
          <label htmlFor="personalNoteName">Personal Note Name</label>
          <input
            id="personalNoteName"
            type="text"
            value={personalNoteName}
            onChange={(e) => setPersonalNoteName(e.target.value)}
            placeholder="New Personal Note"
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="personalNoteType">Personal Note Type</label>
          <select
            id="personalNoteType"
            value={personalNoteType}
            onChange={(e) => setPersonalNoteType(e.target.value)}
          >
            <option value="Description">Description</option>
            <option value="Progress Report">Progress Report</option>
            <option value="Observations">Observations</option>
          </select>
        </div>
        <div className={styles.formFieldTextDisplay}>
          <label htmlFor="personalNoteText">Personal Note Text</label>
          <input
            id="personalNoteText"
            type="text"
            value={personalNoteText}
            onChange={(e) => setPersonalNoteText(e.target.value)}
            placeholder="New Personal Note"
          />
        </div>
        <div className={styles.modalButtons}>
          <button className={styles.submitButton} onClick={handlePersonalNoteSubmit}>
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

export default PersonalNoteCreateModal