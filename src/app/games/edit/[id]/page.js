
import { getDataForSelectors, getGameById } from "@/actions/gamesActions";
import FormEditGame from "@/components/games/FormEditGame";
import { redirect } from "next/navigation";

export default async function GameEditPage({ params }) {
  const { id } = await params
  const isNumber = !Number.isNaN(+id)

  if (!isNumber || +id === 0) redirect('/games')

  const data = await getGameById(+id)
  const dataForSelectors = await getDataForSelectors()
  if (!data || !dataForSelectors) return <h2>No game</h2>

  return (
    <div className="game">
      <FormEditGame data={data} dataForSelectors={dataForSelectors} />
    </div>
  )
}
