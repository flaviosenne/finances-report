interface UserDto {
    id: string
    firstName: string
    lastName: string
    email: string
}


export interface EmailDto {
    user: UserDto
    code: string
}


export interface AccountProtocol {
    activeAccount(payload: EmailDto): Promise<void>
    
    redefinePassword(payload: EmailDto): Promise<void>
}