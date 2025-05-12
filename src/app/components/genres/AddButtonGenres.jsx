'use client'

import { useState } from "react";
import ModalGenres from "./ModalGenres";

export default function AddButtonGenres() {
    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => {
        setIsOpen(false)
    }

    const genre = {
        name: '',
        description: ''
    }

    return (
        <>
            {isOpen && <ModalGenres genre={genre} onClose={onClose} title={"Add"} />}
            <button
                type="submit"
                className="btn btn--edit"
                onClick={() => setIsOpen(!isOpen)}>Add Genre
            </button>
        </>
    )
}
