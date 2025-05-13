import { deleteGame } from "@/actions/gamesActions"
import DeleteButton from "@/components/DeleteButton";
import Image from "next/image";
import Link from "next/link";

export default function FormGames({ games }) {
    if (!games || games.length === 0) {
        return <div className="no-games">
            <h1>No games</h1>
            <Link href="/games/add" className="btn--plus">
                <Image
                    src="/UI/plus+.svg"
                    alt="add games"
                    width={54}
                    height={54}
                />
            </Link>
        </div>
    }

    return <div className="table-container">
        <div className="table-header">
            <h1>Games</h1>
            <Link href={`/games/add/`} className="btn--plus">
                <Image
                    src="/UI/plus+.svg"
                    alt="add games"
                    width={54}
                    height={54}
                />
            </Link>
        </div>
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>

                        <th>Game name</th>
                        <th>Genre</th>
                        <th>Release date</th>
                        <th>Developer</th>
                        <th>Publisher</th>
                        <th>Price</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((g) => {
                        return <tr key={g.game_id}>
                            <td>{g.game_id}</td>

                            <td>{g.title}</td>
                            <td>{g.genre}</td>
                            <td>{new Date(g.release_date).toISOString().slice(0, 10) || '—'}</td>
                            <td>{g.developer}</td>
                            <td>{g.publisher}</td>
                            <td>{g.price || '—'}</td>
                            <td>{g.rating || '—'}</td>
                            <td className="actions">
                                <Link href={`/games/edit/${g.game_id}`}>
                                    <button type="submit" className="btn btn--edit">Edit</button>
                                </Link>
                                <DeleteButton id={g.game_id} fn={deleteGame} />
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div >

}
