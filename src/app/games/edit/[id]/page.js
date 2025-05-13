
import { getGameById } from "@/actions/gamesActions";
import FormEditGame from "@/components/games/FormEditGame";
import { redirect } from "next/navigation";

export default async function GameIdPage({ params }) {
  const { id } = await params
  const isNumber = !Number.isNaN(+id)

  if (!isNumber || +id === 0) redirect('/games')

  const data = await getGameById(+id)
  if (!data) return <h2>No game</h2>

  return (
    <div className="game">
      <FormEditGame data={data} />
    </div>
  )
}
