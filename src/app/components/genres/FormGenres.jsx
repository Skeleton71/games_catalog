import Link from "next/link";
import EditButtonGenres from "./EditButtonGenres";
import AddButtonGenres from "./AddButtonGenres";

export default function FormGenres({ genres }) {

    if (!genres || genres.length === 0) {
        return <div className="no-genres">
            <h1>No genres</h1>
            <Link href="/genres/add" className="btn--plus">
                <Image
                    src="/UI/plus+.svg"
                    alt="add genre"
                    width={54}
                    height={54}
                />
            </Link>
        </div>
    }

    return <div className="table-container">
        <div className="table-header">
            <h1>Genre games</h1>
            <AddButtonGenres />
        </div>
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((g) => {
                        return <tr key={g.genre_id}>
                            <td>{g.genre_id}</td>
                            <td>{g.name}</td>
                            <td>{g.description || '—'}</td>
                            <td className="actions">
                                <EditButtonGenres genre={g} />
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div >

}
