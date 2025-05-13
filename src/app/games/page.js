import { getAllGames } from "@/actions/gamesActions";
import FormGames from "../components/games/FormGames";

export default async function GamesPage() {
  const game = await getAllGames()
  console.log("game", game);

  if (!game?.length) return <h2>No games</h2>


  return (
    <div className="game">
      <FormGames games={game} />
    </div>
  )
}
