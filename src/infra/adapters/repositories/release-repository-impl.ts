import { prisma } from './prisma'
import { UserModel } from '../../../domain/models/user'
import { ReleaseModel } from '../../../domain/models/release'
import { ReleaseRepository } from '../../../app/usecases/report/release.repository'

export class ReleaseRepositoryPrismaImpl implements ReleaseRepository {
    async findAllByUserId(id: string): Promise<ReleaseModel[]> {
        return await prisma.release.findMany({
            where: {
                active: true,
                user: {
                    id
                }
            },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                description: true,
                dueDate: true,
                status: true,
                type: true,
                value: true,
                category: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        description: true,
                        user: true,
                    }
                },
                user: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        email: true,
                        isActive: true,
                        firstName: true,
                        lastName: true,
                    }
                }
            },
            // include: {
            //     category: {
            //         select: {
            //             id: true,
            //             createdAt: true,
            //             updatedAt: true,
            //             description: true,
            //             user: true,
            //         }
            //     },
            //     user: {
            //         select: {
            //             id: true,
            //             createdAt: true,
            //             updatedAt: true,
            //             email: true,
            //             isActive: true,
            //             firstName: true,
            //             lastName: true,
            //         }
            //     }
            // }
        }) as ReleaseModel[]
    }

    async findAllActive(): Promise<UserModel[]> {
        return await prisma.user.findMany({
            where: { isActive: true },
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                isActive: true,
                firstName: true,
                lastName: true,
            }
        })
    }

}