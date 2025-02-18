import { LsaLocalStorageStore, User } from '@customTypes/index'
import { createContext, ReactNode, useState } from 'react'

interface StoreContextProps {
    store: LsaLocalStorageStore
    setLoggedUser: (user: User) => void
    getLoggedUser: () => User | undefined
    getUsers: () => User[]
}

export const StoreContext = createContext<StoreContextProps>({
    store: { users: [] },
    setLoggedUser: () => {},
    getLoggedUser: () => undefined,
    getUsers: () => []
})

export function StoreContextProvider({ children }: { children: ReactNode }) {
    const [store, setStore] = useState<LsaLocalStorageStore>(
        JSON.parse(
            localStorage.getItem('lsa') ||
                '{ "users": [], "loggedUser": null }',
            (key, value) =>
                key === 'loggedUser' && value === null ? undefined : value
        )
    )

    const setLoggedUser = (loggedUser: User) => {
        setStore((prevStore) => {
            const users = [...prevStore.users]

            if (!users.find((u) => u.email === loggedUser.email)) {
                users.push(loggedUser)
            }

            localStorage.setItem('lsa', JSON.stringify({ users, loggedUser }))

            return { users, loggedUser }
        })
    }
    const getLoggedUser = (): User | undefined => store.loggedUser

    const getUsers = (): User[] => store.users

    return (
        <StoreContext.Provider
            value={{ store, setLoggedUser, getLoggedUser, getUsers }}
        >
            {children}
        </StoreContext.Provider>
    )
}
