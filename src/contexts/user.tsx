import { User } from '@/types'
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState
} from 'react'

interface UserContextProps {
    user: User
    setUser: Dispatch<SetStateAction<User>>
}

export const UserContext = createContext<UserContextProps>({
    user: { email: '', password: '' },
    setUser: () => {}
})

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(
        JSON.parse(localStorage.getItem('lsa') || '{}')
    )

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
