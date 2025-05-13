

import { deletePublisher } from "@/actions/publishersActions"
import DeleteButton from "@/components/DeleteButton";
import Image from "next/image";
import Link from "next/link";

export default function FormPublishers({ publishers }) {

    if (!publishers || publishers.length === 0) {
        return <div className="no-publishers">
            <h1>No publishers</h1>
            <Link href="/publishers/add" className="btn--plus">
                <Image
                    src="/UI/plus+.svg"
                    alt="add publishers"
                    width={54}
                    height={54}
                />
            </Link>
        </div>
    }

    return <div className="table-container">
        <div className="table-header">
            <h1>Publishers</h1>
            <Link href={`/publishers/add/`} className="btn--plus">
                <Image
                    src="/UI/plus+.svg"
                    alt="add publishers"
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
                    {publishers.map((g) => {
                        return <tr key={g.publisher_id}>
                            <td>{g.publisher_id}</td>
                            <td>{g.name}</td>
                            <td>{g.country || '—'}</td>
                            <td>{g.founded_year || '—'}</td>
                            <td>{g.website || '—'}</td>
                            <td className="actions">
                                <Link href={`/publishers/edit/${g.publisher_id}`}>
                                    <button type="submit" className="btn btn--edit">Edit</button>
                                </Link>
                                <DeleteButton id={g.publisher_id} fn={deletePublisher} />


                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div >

}
