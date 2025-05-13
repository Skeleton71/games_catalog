'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../lib/prisma'
import { type } from 'os'

export async function addGenre(name, description) {
    try {
        const developerData = {
            genre_id: 6,
            name: "sssss",
            // country: "Canada",
            // founded_year: 2025,
            // website: "https://cyberdyne.com"
        }
        const newGenre = await prisma.genres.create({
            data: developerData
        })
        return newGenre
    } catch (error) {
        console.error('Error adding genre:', error)
        throw new Error('Failed to add genre')
    }
}

export async function updateGenre(genreId, name, description) {
    let updatedGenre;

    try {
        if (!genreId) {
            updatedGenre = await prisma.genres.create({
                data: {
                    name,
                    description
                }
            });
        }
        else {
            updatedGenre = await prisma.genres.update({
                where: { genre_id: genreId },
                data: { name, description }
            });
        }

        revalidatePath('/genres')
        return updatedGenre
    } catch (error) {
        console.error('Error updating genre:', error)
        return
    }
}


export async function getGenreById(genreId) {
    try {
        const genre = await prisma.genres.findUnique({
            where: { genre_id: genreId },
        })
        return genre
    } catch (error) {
        console.error('Error fetching genre:', error)
        return null
    }
}


export async function getAllGenres() {
    try {
        const genres = await prisma.genres.findMany()
        return genres
    } catch (error) {
        console.error('Error fetching genres:', error)
        throw new Error('Failed to fetch genres')
    }
    finally {
        await prisma.$disconnect()
    }
}

// export async function updateGenre(genreId, name, description) {
//     try {
//         const updatedGenre = await prisma.genres.update({
//             where: { genre_id: genreId },
//             data: {
//                 name,
//                 description
//             }
//         })
//         return updatedGenre
//     } catch (error) {
//         console.error('Error updating genre:', error)
//         throw new Error('Failed to update genre')
//     } finally {
//         await prisma.$disconnect()
//     }
// }

export async function deleteGenre(genre_id) {
    try {

        // Сначала проверяем, есть ли связанные игры
        const gamesWithGenre = await prisma.games.count({
            where: { genre_id }
        })

        if (gamesWithGenre > 0) {
            return { message: 'Cannot delete genre with associated games', type: 'error' }
        }

        const deletedGenre = await prisma.genres.delete({
            where: { genre_id }
        })


        // const deletedGenre = await prisma.genres.delete({
        //     where: { genre_id: 4 }
        // })
        revalidatePath('/genres')

        return deletedGenre
    } catch (error) {
        console.error('Error deleting genre:', error)
        return { message: 'Error deleting genre', type: 'error' }

    }

}
