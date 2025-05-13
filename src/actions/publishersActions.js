'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../lib/prisma'


export async function updatePublisher(formData) {
    let updatedPublisher;

    const founded_year = Number(formData.founded_year)

    if (!founded_year || (founded_year && (founded_year < 1900 || founded_year > 2100))) {
        return { message: 'The year must be in the range of 1900-2100!', type: 'error' }
    }

    formData.founded_year = founded_year

    try {
        if (!formData.publisher_id) {
            updatedPublisher = await prisma.publishers.create({
                data: formData
            });
        }
        else {
            updatedPublisher = await prisma.publishers.update({
                where: { publisher_id: formData.publisher_id },
                data: formData
            });
        }

        revalidatePath('/publishers')
        return updatedPublisher
    } catch (error) {
        console.error('Error updating publisher:', error)
        return { message: 'Error updating publisher', type: 'error' }
    }
}


export async function getPublisherById(publisherId) {
    try {
        const publisher = await prisma.publishers.findUnique({
            where: { publisher_id: publisherId },
            // include: { games: true } // Опционально: включаем связанные игры
        })
        return publisher
    } catch (error) {
        console.error('Error fetching publisher:', error)
        return null
    }
}

export async function getAllPublishers() {
    try {
        const publishers = await prisma.publishers.findMany()
        return publishers
    } catch (error) {
        console.error('Error fetching publishers:', error)
        return []
    }
}

export async function deletePublisher(publisher_id) {
    try {
        const gamesWithPublisher = await prisma.games.count({
            where: { publisher_id }
        })

        if (gamesWithPublisher > 0) {
            return { message: 'Cannot delete publisher with associated games', type: 'error' }
        }

        const deletedPublisher = await prisma.publishers.delete({
            where: { publisher_id }
        })

        revalidatePath('/publishers')

        return deletedPublisher
    } catch (error) {
        console.error('Error deleting publisher:', error)
        return { message: 'Error deleting publisher', type: 'error' }

    }

}

