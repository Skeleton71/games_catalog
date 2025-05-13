'use client'

import { EditGame } from "@/actions/gamesActions";
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function FormAddGame({ data, dataForSelectors }) {
  const router = useRouter()

  const [title, setTitle] = useState(data.title)
  const [genre_id, setGenre_id] = useState(data.genre_id)
  const [release_date, setRelease_date] = useState(data.release_date)
  const [developer_id, setDeveloper_id] = useState(data.developer_id)
  const [publisher_id, setPublisher_id] = useState(data.publisher_id)
  const [price, setPrice] = useState(data.price)
  const [rating, setRating] = useState(data.rating)

  console.log(developer_id, "developer_id");


  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    setError('')

    formData.set("game_id", data.game_id)

    try {
      const res = await EditGame(formData)

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
          <h2>Edit game</h2>
        </div>

        <form action={handleSubmit} className="genre-form">
          <div className="form-group">
            <label htmlFor="name">Game name *</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
            />
          </div>

          <div className="form-group">
            <select
              name="genre_id"
              id="genre_id"
              defaultValue={genre_id}
              onChange={(e) => setGenre_id(e.target.value)}
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
              defaultValue={new Date(release_date).toISOString().slice(0, 10) || '—'}
              onChange={(e) => setRelease_date(e.target.value)}
            />
          </div>

          <div className="form-group">
            <select
              name="developer_id"
              id="developer_id"
              onChange={(e) => setDeveloper_id(e.target.value)}
              defaultValue={developer_id}
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
              onChange={(e) => setPublisher_id(e.target.value)}
              defaultValue={publisher_id}
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
              step={0.01}
              id="price"
              name="price"
              defaultValue={price}
              onChange={(e) => setPrice(e.target.value)}

            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              step={0.01}
              id="rating"
              name="rating"
              defaultValue={rating}
              onChange={(e) => setRating(e.target.value)}
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
              disabled={isSubmitting || !title}
            >
              {isSubmitting ? 'Saving...' : 'Save canges'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
