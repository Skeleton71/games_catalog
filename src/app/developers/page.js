import { getAllDevelopers } from "../../actions/developersActions";
import FormDevelopers from "../components/developers/FormDevelopers";

export default async function DevelopersPage() {
  const developer = await getAllDevelopers()

  if (!developer?.length) return <h2>No developers</h2>


  return (
    <div className="developer">
      <FormDevelopers developers={developer} />
    </div>
  )
}
