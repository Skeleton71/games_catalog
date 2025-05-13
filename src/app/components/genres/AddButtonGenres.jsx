'use client'

import { useState } from "react";
import ModalGenres from "./ModalGenres";
import Image from "next/image";
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

            <Image
                className="btn"
                src="/UI/plus+.svg"
                alt="add genre"
                onClick={() => setIsOpen(!isOpen)}
                width={54}
                height={54}
            />

        </>
    )
}
