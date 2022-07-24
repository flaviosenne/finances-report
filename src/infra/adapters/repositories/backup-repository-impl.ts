import { prisma } from './prisma'
import { BackupVo } from '../../../app/usecases/backup/backup.vo'
import { BackupRepository } from '../../../app/usecases/backup/repository'

export class BackupRepositoryPrismaImpl implements BackupRepository {
    
    async findAllUsersActive(): Promise<BackupVo[]> {
        return await prisma.user.findMany({
            select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                email: true,
                isActive: true,
                firstName: true,
                lastName: true,
                password: true,
                releases: {
                    include: {
                        category: true
                    }
                },
                categories: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        isActive: true,
                        image: true,
                        description: true
                    }
                },
                codes: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        code: true,
                        isValid: true,
                    }
                },
                banks: {
                    select: {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        isActive: true,
                        image: true,
                        description: true
                    }
                }
            }
            }) as BackupVo[]
    
    }


}