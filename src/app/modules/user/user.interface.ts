export interface TUser {
    id: string,
    password: string,
    needPasswordChange?: boolean,
    role: 'admin' | 'student' | 'faculty'
    status: 'in-progress' | 'blocked',
    isDeleted: boolean
}
export type INewUser {
    password?: string,
    role: string,
    id: string
}