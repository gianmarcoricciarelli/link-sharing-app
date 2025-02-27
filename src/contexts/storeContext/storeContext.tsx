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
    getLoggedUserLinks: () => Link[]
}

export const StoreContext = createContext<StoreContextProps>({
    store: { users: [] },
    setStore: () => {},
    setLoggedUser: () => {},
    getLoggedUser: () => undefined,
    getUsers: () => [],
    getLoggedUserLinks: () => []
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

    return (
        <StoreContext.Provider
            value={{
                store,
                setStore,
                setLoggedUser,
                getLoggedUser,
                getUsers,
                getLoggedUserLinks
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}
