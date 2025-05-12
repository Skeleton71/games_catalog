
import { getDeveloperById } from "@/actions/developersActions";
import FormEditDeveloper from "@/components/developers/FormEditDeveloper";
import { redirect } from "next/navigation";

export default async function DeveloperIdPage({ params }) {
  const { id } = await params
  const isNumber = !Number.isNaN(+id)

  if (!isNumber || +id === 0) redirect('/developers')

  const data = await getDeveloperById(+id)
  if (!data) return <h2>No developer</h2>

  return (
    <div className="developer">
      <FormEditDeveloper data={data} />
    </div>
  )
}
