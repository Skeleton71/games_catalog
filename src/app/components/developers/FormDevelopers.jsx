

import { deleteDeveloper } from "@/actions/developersActions";
import DeleteButton from "@/components/DeleteButton";
import Image from "next/image";
import Link from "next/link";

export default function FormDevelopers({ developers }) {

    if (!developers || developers.length === 0) {
        return <div className="no-developers">
            <h1>No developers</h1>
            <Link href="/developers/add" className="btn--plus">
                <Image
                    src="/UI/plus+.svg"
                    alt="add developers"
                    width={54}
                    height={54}
                />
            </Link>
        </div>
    }

    return <div className="table-container">
        <div className="table-header">
            <h1>Developers</h1>
            <Link href={`/developers/add/`} className="btn--plus">
                <Image
                    src="/UI/plus+.svg"
                    alt="add developers"
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
                        <th>Name</th>
                        <th>Contry</th>
                        <th>Founded_year </th>
                        <th>Website</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {developers.map((g) => {
                        return <tr key={g.developer_id}>
                            <td>{g.developer_id}</td>
                            <td>{g.name}</td>
                            <td>{g.country || '—'}</td>
                            <td>{g.founded_year || '—'}</td>
                            <td>{g.website || '—'}</td>
                            <td className="actions">
                                <Link href={`/developers/edit/${g.developer_id}`}>
                                    <button type="submit" className="btn btn--edit">Edit</button>
                                </Link>
                                <DeleteButton id={g.developer_id} fn={deleteDeveloper} />

                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div >

}
