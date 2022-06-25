import { prisma } from './prisma'
import { UserModel } from "../../domain/models/user";
import { UserRepository } from "../../domain/usecases/report/repository/user-repository";

export class UserRepositoryAdapter implements UserRepository {
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