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
    activeAccount(): Promise<void>
    
    redefinePassword(): Promise<void>
}