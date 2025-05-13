'use client'

import { updateGenre } from "@/actions/genresActions";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function ModalGenres({ genre, onClose, title }) {
  const router = useRouter()


  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (genre) {
      setFormData({
        name: genre.name,
        description: genre.description || ''
      })
    }
  }, [genre])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!genre) return

    setIsSubmitting(true)
    setError('')

    try {
      const response = await updateGenre(genre.genre_id, formData.name, formData.description)

      if (!response) {
        throw new Error('Genre update error')
      }

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Oops! Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }
  if (!genre) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title === "Add" ? 'Add' : "Edit"} genre</h2>
          <button onClick={onClose} className="btn--close">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="genre-form">
          <div className="form-group">
            <label htmlFor="name">Genre name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              maxLength={500}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting || !formData.name}
            >
              {isSubmitting ? 'Saving...' : 'Save canges'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
