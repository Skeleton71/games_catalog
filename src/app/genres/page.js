import { getAllGenres } from "@/actions/genresActions";
import FormGenres from "../components/genres/FormGenres";



export default async function GenresPage() {
  const genres = await getAllGenres()

  return (
    <div className="genres">
      <FormGenres genres={genres} />
    </div>
  )
}
