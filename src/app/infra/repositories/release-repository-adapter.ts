import { ReleaseModel } from '../../domain/models/release'
import { ReleaseRepository } from '../../domain/usecases/report/repository/release-repository'
import { prisma } from './prisma'

export class ReleaseRepositoryAdapter implements ReleaseRepository {
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

}