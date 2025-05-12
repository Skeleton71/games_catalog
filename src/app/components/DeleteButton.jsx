'use client'

import { useState } from "react";
import ModalAlert from "./ModalAlert";

export default function DeleteButton({ id, fn }) {
    const [msg, setMsg] = useState('')

    const handleDelete = async () => {
        if (!id) return

        try {
            const res = await fn(id)
            console.log("res", res);

            if (res.message) setMsg(res.message)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {msg && <ModalAlert message={msg} onClose={() => setMsg('')} />}
            <button type="submit" className="btn btn--delete" onClick={handleDelete}>Delete</button>
        </>
    )
}
