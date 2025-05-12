'use client'

import { useState } from "react";
import { updateGenre, deleteGenre } from "../../../actions/genresActions";
import ModalGenres from "./ModalGenres";
import ModalAlert from "../ModalAlert";

export default function EditButtonGenres({ genre }) {
    const [isOpen, setIsOpen] = useState(false)
    const [msg, setMsg] = useState('')

    const onClose = () => {
        setIsOpen(false)
    }

    const handleDelete = async () => {

        if (!genre) return

        try {
            const res = await deleteGenre(genre.genre_id)

            console.log("res", res);

            if (res.message) {
                setMsg(res.message)
            }

            onClose()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {msg && <ModalAlert message={msg} onClose={() => setMsg('')} />}
            {isOpen && <ModalGenres genre={genre} onClose={onClose} />}

            <button type="submit" className="btn btn--edit" onClick={() => setIsOpen(!isOpen)}>Edit</button>
            <button type="submit" className="btn btn--delete" onClick={handleDelete}>Delete</button>


        </>
    )
}
