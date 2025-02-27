/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useState } from 'react'

import { Link, LsaLocalStorageStore, User } from '@customTypes/index'

interface StoreContextProps {
    store: LsaLocalStorageStore
    setLoggedUser: (user: User) => void
    getLoggedUser: () => User | undefined
    getUsers: () => User[]
    getLoggedUserLinks: () => Link[]
    setLoggedUserLinks: (newLink: Link) => void
}

export const StoreContext = createContext<StoreContextProps>({
    store: { users: [] },
    setLoggedUser: () => {},
    getLoggedUser: () => undefined,
    getUsers: () => [],
    getLoggedUserLinks: () => [],
    setLoggedUserLinks: () => {}
})

export function StoreContextProvider({ children }: { children: ReactNode }) {
    const [store, setStore] = useState<LsaLocalStorageStore>(
        JSON.parse(
            localStorage.getItem('lsa') || '{ "users": [], "loggedUser": {} }',
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

    const getLoggedUserLinks = (): Link[] => {
        return store.loggedUser?.links || []
    }

    const setLoggedUserLinks = (newLink: Link) => {
        setStore((prevStore) => {
            const newLinks = [...(prevStore.loggedUser?.links || []), newLink]
            const newLoggedUser: User = {
                ...prevStore.loggedUser!,
                links: newLinks
            }
            const newUsers = [
                ...prevStore.users.filter(
                    (u) => u.email !== newLoggedUser.email
                ),
                newLoggedUser
            ]

            localStorage.setItem(
                'lsa',
                JSON.stringify({
                    users: newUsers,
                    loggedUser: newLoggedUser
                })
            )

            return { users: newUsers, loggedUser: newLoggedUser }
        })
    }

    return (
        <StoreContext.Provider
            value={{
                store,
                setLoggedUser,
                getLoggedUser,
                getUsers,
                getLoggedUserLinks,
                setLoggedUserLinks
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}
