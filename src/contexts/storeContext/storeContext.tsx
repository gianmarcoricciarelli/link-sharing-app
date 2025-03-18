/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState
} from 'react'

import { Link, LsaLocalStorageStore, User } from '@customTypes/index'

interface StoreContextProps {
    store: LsaLocalStorageStore
    setStore: Dispatch<SetStateAction<LsaLocalStorageStore>>
    setLoggedUser: (user: User) => void
    getLoggedUser: () => User | undefined
    getUsers: () => User[]
    getUserByEmailAndPassword: (
        email: string,
        password: string
    ) => User | undefined
    getLoggedUserLinks: () => Link[]
    setFirstName: (firstName: string) => void
    setLastName: (lastName: string) => void
    setEmail: (email: string) => void
}

export const StoreContext = createContext<StoreContextProps>({
    store: { users: [] },
    setStore: () => {},
    setLoggedUser: () => {},
    getLoggedUser: () => undefined,
    getUsers: () => [],
    getUserByEmailAndPassword: () => undefined,
    getLoggedUserLinks: () => [],
    setFirstName: () => {},
    setLastName: () => {},
    setEmail: () => {}
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

            if (!users.find((u) => u.id === loggedUser.id)) {
                users.push(loggedUser)
            }

            localStorage.setItem('lsa', JSON.stringify({ users, loggedUser }))

            return { users, loggedUser }
        })
    }
    const getLoggedUser = (): User | undefined => store.loggedUser

    const getUsers = (): User[] => store.users

    const getUserByEmailAndPassword = (
        email: string,
        password: string
    ): User | undefined => {
        return getUsers().find(
            (u) => u.email === email && u.password === password
        )
    }

    const getLoggedUserLinks = (): Link[] => {
        return store.loggedUser?.links || []
    }

    const setFirstName = (firstName: string) => {
        setStore((prevStore) => {
            const newStore = {
                ...prevStore,
                loggedUser: {
                    ...prevStore.loggedUser!,
                    firstName
                }
            }
            newStore.users.find(
                (u) => u.id === newStore.loggedUser.id
            )!.firstName = firstName

            localStorage.setItem('lsa', JSON.stringify(newStore))

            return newStore
        })
    }

    const setLastName = (lastName: string) => {
        setStore((prevStore) => {
            const newStore = {
                ...prevStore,
                loggedUser: {
                    ...prevStore.loggedUser!,
                    lastName
                }
            }
            newStore.users.find(
                (u) => u.id === newStore.loggedUser.id
            )!.lastName = lastName

            localStorage.setItem('lsa', JSON.stringify(newStore))

            return newStore
        })
    }

    const setEmail = (email: string) => {
        setStore((prevStore) => {
            const newStore = {
                ...prevStore,
                loggedUser: {
                    ...prevStore.loggedUser!,
                    email
                }
            }
            newStore.users.find((u) => u.id === newStore.loggedUser.id)!.email =
                email

            localStorage.setItem('lsa', JSON.stringify(newStore))

            return newStore
        })
    }

    return (
        <StoreContext.Provider
            value={{
                store,
                setStore,
                setLoggedUser,
                getLoggedUser,
                getUsers,
                getUserByEmailAndPassword,
                getLoggedUserLinks,
                setFirstName,
                setLastName,
                setEmail
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}
