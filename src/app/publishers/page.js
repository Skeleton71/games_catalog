import { getAllPublishers } from "@/actions/publishersActions";
import FormPublishers from "../components/publishers/FormPublishers";

export default async function PublishersPage() {
  const publisher = await getAllPublishers()

  if (!publisher?.length) return <h2>No publishers</h2>


  return (
    <div className="publisher">
      <FormPublishers publishers={publisher} />
    </div>
  )
}
