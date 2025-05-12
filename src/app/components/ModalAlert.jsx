'use client'

export default function ModalAlert({ message, onClose }) {
  if (!message) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          {message && <div className="error-message">{message}</div>}
          <button onClick={onClose} className="btn--close">
            &times;
          </button>
        </div>
      </div>
    </div>
  )
}
