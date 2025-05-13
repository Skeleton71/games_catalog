'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../lib/prisma'


export async function EditGame(formData) {
    let updatedGame;
    console.log(formData);

    const game_id = Number(formData.get("game_id"))
    const genre_id = Number(formData.get("genre_id"))
    const title = formData.get("title")
    const release_date = formData.get("release_date")
    const developer_id = Number(formData.get("developer_id"))
    const publisher_id = Number(formData.get("publisher_id"))
    const price = Number(formData.get("price")) || 0
    const rating = Number(formData.get("rating")) || 0

    const data = {
        title,
        price,
        rating,
        genre_id: genre_id || null,
        developer_id: developer_id || null,
        publisher_id: publisher_id || null,
        release_date: release_date ? new Date(release_date) : null
    }
    console.log(data);

    // const founded_year = Number(formData.founded_year)

    // if (!founded_year || (founded_year && (founded_year < 1900 || founded_year > 2100))) {
    //     return { message: 'Invalid Founded year', type: 'error' }
    // }

    // formData.founded_year = founded_year

    try {
        updatedGame = await prisma.games.update({
            where: { game_id },
            data
        });

        revalidatePath('/games')
        return updatedGame
    } catch (error) {
        console.error('Error updating game:', error)
        return { message: 'Error updating game', type: 'error' }
    }
}

export async function AddGame(formData) {
    let updatedGame;

    // Преобразуем в правильные типы
    const data = {
        title: formData.title,
        price: Number(formData.price || 0), // преобразуем в число
        rating: Number(formData.rating || 0), // с дефолтным значением
        genre_id: Number(formData.genre_id) ? Number(formData.genre_id) : null,
        developer_id: Number(formData.developer_id) ? Number(formData.developer_id) : null,
        publisher_id: Number(formData.publisher_id) ? Number(formData.publisher_id) : null,
        release_date: (formData.release_date) ? new Date(formData.release_date) : null // булево значени
    }

    // const founded_year = Number(formData.founded_year)

    // if (!founded_year || (founded_year && (founded_year < 1900 || founded_year > 2100))) {
    //     return { message: 'Invalid Founded year', type: 'error' }
    // }

    // formData.founded_year = founded_year

    try {
        if (!formData.game_id) {
            updatedGame = await prisma.games.create({
                data
            });
        }
        else {
            updatedGame = await prisma.games.update({
                where: { game_id: formData.game_id },
                data
            });
        }

        revalidatePath('/games')
        return updatedGame
    } catch (error) {
        console.error('Error updating game:', error)
        return { message: 'Error updating game', type: 'error' }
    }
}


export async function getGameById(gameId) {
    try {
        const game = await prisma.games.findUnique({
            where: { game_id: gameId },
            // include: { games: true } // Опционально: включаем связанные игры
        })
        return game
    } catch (error) {
        console.error('Error fetching game:', error)
        return null
    }
}

export async function getAllGames() {
    try {
        const res = await prisma.games.findMany({
            include: { genres: true, developers: true, publishers: true }

        })

        const newArr = res.map((el) => {
            const genre = el.genres?.name
            const developer = el.developers?.name
            const publisher = el.publishers?.name

            delete el.genres;
            delete el.developers;
            delete el.publishers;

            return { ...el, genre, developer, publisher };
        })

        return newArr
    } catch (error) {
        console.error('Error fetching games:', error)
        return []
    }
}

export async function deleteGame(game_id) {
    try {
        const deletedGame = await prisma.games.delete({
            where: { game_id }
        })

        revalidatePath('/games')

        return deletedGame
    } catch (error) {
        console.error('Error deleting game:', error)
        return { message: 'Error deleting game', type: 'error' }

    }



}

export async function getDataForSelectors() {
    try {
        const genresList = await prisma.genres.findMany({
            select: {
                genre_id: true,
                name: true
            }
        })
        const developersList = await prisma.developers.findMany({
            select: {
                developer_id: true,
                name: true
            }
        })
        const publishersList = await prisma.publishers.findMany({
            select: {
                publisher_id: true,
                name: true
            }
        })

        return { genresList, developersList, publishersList }
    } catch (error) {
        console.error('Error fetching games:', error)
        return []
    }
}
