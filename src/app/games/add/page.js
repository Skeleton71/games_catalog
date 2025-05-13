
import { getDataForSelectors } from "@/actions/gamesActions";
import FormAddGame from "@/components/games/FormAddGame";

export default async function GameAddPage() {
  const dataForSelectors = await getDataForSelectors()

  return (
    <div className="game">
      <FormAddGame dataForSelectors={dataForSelectors} />
    </div>
  )
}
