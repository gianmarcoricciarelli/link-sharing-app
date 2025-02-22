export type Color =
    | 'lsa-dark-gray'
    | 'lsa-grey'
    | 'lsa-purple'
    | 'lsa-red'
    | 'white'

export type User = {
    email: string
    password: string
}

export type LsaLocalStorageStore = {
    users: User[]
    loggedUser?: User
}

export type AppSection = 'links' | 'details' | 'preview'
