export interface BackupVo {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    password: string
    isActive: boolean
    firstName: string
    lastName: string
    codes: UserCodeBackupVo[]
    releases: ReleaseBackupVo[]
    categories: CategoryBackupVo[]
    banks: BankBackupVo[]
}

export interface UserBackupVo {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    password: string
    isActive: boolean
    firstName: string
    lastName: string
}

export interface ReleaseBackupVo {
    id: string
    createdAt: Date
    updatedAt: Date
    active: boolean
    description: string
    dueDate: Date
    status: string
    type: string
    value: number
    category: {id: string}
    bankId: string
}


export interface UserCodeBackupVo {
    id: string
    createdAt: Date
    updatedAt: Date
    code: string
    isValid: boolean
}


export interface CategoryBackupVo {
    id: string
    createdAt: Date
    updatedAt: Date
    description: string
    isActive: boolean
    image?: string

}


export interface BankBackupVo {
    id: string
    createdAt: Date
    updatedAt: Date
    description: string
    isActive: boolean
    image?: string

}