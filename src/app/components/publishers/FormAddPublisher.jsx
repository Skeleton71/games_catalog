'use client'

import { updateGame } from "@/actions/gamesActions";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function FormAddGame() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    founded_year: '',
    website: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')



  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name) {
      setError('Game name is required')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const res = await updateGame(formData)

      console.log("res", res);

      if (!res) throw new Error('Game update error')
      else if (res.message) setError(res.message)
      else router.push(`/games`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Oops! Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }
  console.log("formData", formData);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add game</h2>
          {/* <button onClick={onClose} className="btn--close">
            &times;
          </button> */}
        </div>

        <form onSubmit={handleSubmit} className="genre-form">
          <div className="form-group">
            <label htmlFor="name">Game name *</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              onChange={handleChange}
              maxLength={50}
              minLength={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="founded_year">Founded year</label>
            <input
              type="number"
              id="founded_year"
              name="founded_year"
              onChange={handleChange}
              maxLength={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              onChange={handleChange}
              // required
              maxLength={50}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              onClick={() => router.push(`/games`)}
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
