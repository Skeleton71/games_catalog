'use client'

import { AddGame } from "@/actions/gamesActions";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function FormAddGame({ dataForSelectors }) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    release_date: '',
    genre_id: "0",
    developer_id: "0",
    publisher_id: "0",
    price: '',
    rating: ''
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


    setIsSubmitting(true)
    setError('')

    // const dataArr = Object.entries(formData)
    // const newArr = dataArr.filter((el) => {
    //   if (el[1] !== "") return true
    // })
    // const newFormData = Object.fromEntries(newArr)


    try {
      const res = await AddGame(formData)

      if (!res) throw new Error('Game update error')
      else if (res.message) setError(res.message)
      else router.push(`/games`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Oops! Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add game</h2>
        </div>

        <form onSubmit={handleSubmit} className="genre-form">
          <div className="form-group">
            <label htmlFor="name">Game name *</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <select
              name="genre_id"
              id="genre_id"
              onChange={handleChange}
              className=""
            >
              <option value="0">Select a genre</option>
              {dataForSelectors.genresList.map(g => {
                return <option key={g.genre_id} value={g.genre_id}>
                  {g.name}
                </option>
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Release_date">Release_date</label>
            <input
              type="date"
              id="release_date"
              name="release_date"
              onChange={handleChange}
            />
          </div>



          <div className="form-group">
            <select
              name="developer_id"
              id="developer_id"
              onChange={handleChange}
              className=""
            >
              <option value="0">Select a developer</option>
              {dataForSelectors.developersList.map(g => {
                return <option key={g.developer_id} value={g.developer_id}>
                  {g.name}
                </option>
              })}
            </select>
          </div>

          <div className="form-group">
            <select
              name="publisher_id"
              id="publisher_id"
              onChange={handleChange}
              className=""
            >
              <option value="0">Select a publisher</option>
              {dataForSelectors.publishersList.map(g => {
                return <option key={g.publisher_id} value={g.publisher_id}>
                  {g.name}
                </option>
              })}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              step={0.01}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              name="rating"
              onChange={handleChange}
              step={0.01}
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
              disabled={isSubmitting || !formData.title}
            >
              {isSubmitting ? 'Saving...' : 'Save canges'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
