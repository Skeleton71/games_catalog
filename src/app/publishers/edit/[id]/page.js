
import { getPublisherById } from "@/actions/publishersActions";
import FormEditPublisher from "@/components/publishers/FormEditPublisher";
import { redirect } from "next/navigation";

export default async function PublisherIdPage({ params }) {
  const { id } = await params
  const isNumber = !Number.isNaN(+id)

  if (!isNumber || +id === 0) redirect('/publishers')

  const data = await getPublisherById(+id)
  if (!data) return <h2>No publisher</h2>

  return (
    <div className="publisher">
      <FormEditPublisher data={data} />
    </div>
  )
}
