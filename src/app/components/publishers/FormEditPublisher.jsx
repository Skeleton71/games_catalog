'use client'

import { updatePublisher } from "@/actions/publishersActions"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function FormEditPublisher({ data }) {
  const router = useRouter()

  const path = usePathname().split("/")[1]

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    founded_year: '',
    website: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (data) {
      setFormData(data)
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!data) return

    setIsSubmitting(true)
    setError('')

    try {
 const res = await updatePublisher(formData)


      if (!res) throw new Error('Publisher update error')
      else if (res.message) setError(res.message)
      else router.push(`/${path}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Oops! Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!data) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit publisher</h2>
          {/* <button onClick={onClose} className="btn--close">
            &times;
          </button> */}
        </div>

        <form onSubmit={handleSubmit} className="genre-form">
          <div className="form-group">
            <label htmlFor="name">Publisher name *</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={formData.name}
              onChange={handleChange}
              required
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              defaultValue={formData.country}
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
              defaultValue={formData.founded_year}
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
              defaultValue={formData.website}
              onChange={handleChange}
              maxLength={50}
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="counrty">Country</label>
            <textarea
              id="counrty"
              name="counrty"
              defaultValue={formData.country}
              onChange={handleChange}
              rows={2}
              maxLength={100}
            />
          </div> */}

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              onClick={() => router.push(`/${path}`)}
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
