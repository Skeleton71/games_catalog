'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../lib/prisma'

export async function addDeveloper(name, description) {
    try {
        const developerData = {
            developer_id: 6,
            name: "sssss",
            // country: "Canada",
            // founded_year: 2025,
            // website: "https://cyberdyne.com"
        }
        const newDeveloper = await prisma.developers.create({
            data: developerData
        })
        return newDeveloper
    } catch (error) {
        console.error('Error adding developer:', error)
        throw new Error('Failed to add developer')
    }
}

export async function updateDeveloper(formData) {
    let updatedDeveloper;

    const founded_year = Number(formData.founded_year)

    if (!founded_year || (founded_year && (founded_year < 1900 || founded_year > 2100))) {
        return { message: 'Invalid Founded year', type: 'error' }
    }

    formData.founded_year = founded_year

    try {
        if (!formData.developer_id) {
            updatedDeveloper = await prisma.developers.create({
                data: formData
            });
        }
        else {
            updatedDeveloper = await prisma.developers.update({
                where: { developer_id: formData.developer_id },
                data: formData
            });
        }

        revalidatePath('/developers')
        return updatedDeveloper
    } catch (error) {
        console.error('Error updating developer:', error)
        return { message: 'Error updating developer', type: 'error' }
    }
}


export async function getDeveloperById(developerId) {
    try {
        const developer = await prisma.developers.findUnique({
            where: { developer_id: developerId },
            // include: { games: true } // Опционально: включаем связанные игры
        })
        return developer
    } catch (error) {
        console.error('Error fetching developer:', error)
        return null
    }
}

export async function getAllDevelopers() {
    try {
        const developers = await prisma.developers.findMany()
        return developers
    } catch (error) {
        console.error('Error fetching developers:', error)
        return []
    }
}

export async function deleteDeveloper(developer_id) {
    try {

        // Сначала проверяем, есть ли связанные игры
        const gamesWithDeveloper = await prisma.games.count({
            where: { developer_id }
        })

        if (gamesWithDeveloper > 0) {
            return { message: 'Cannot delete developer with associated games', type: 'error' }
        }

        const deletedDeveloper = await prisma.developers.delete({
            where: { developer_id }
        })


        // const deletedDeveloper = await prisma.developers.delete({
        //     where: { developer_id: 4 }
        // })
        revalidatePath('/developers')

        return deletedDeveloper
    } catch (error) {
        console.error('Error deleting developer:', error)
        return { message: 'Error deleting developer', type: 'error' }

    }

}

