/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from 'react'

import { Link, Platform } from '@customTypes/index'

import { StoreContext } from '@contexts/storeContext/storeContext'

interface LinkCustomizationContextProps {
    links: Link[]
    setLinks: () => void
}

export const LinkCustomizationContext =
    createContext<LinkCustomizationContextProps>({
        links: [],
        setLinks: () => {}
    })

export function LinkCustomizationContextProvider({
    children
}: {
    children: ReactNode
}) {
    const { getLoggedUserLinks, setLoggedUserLinks } = useContext(StoreContext)

    const [platforms, setPlatforms] = useState<Platform[]>([
        'GitHub',
        'Frontend Mentor',
        'Twitter',
        'LinkedIn',
        'YouTube',
        'Facebook',
        'Twitch',
        'Dev.to',
        'Codewars',
        'Codepen',
        'freeCodeCamp',
        'GitLab',
        'Hashnode',
        'Stack Overflow'
    ])

    const setLinks = () => {
        setLoggedUserLinks({ link: '', platform: platforms[0] })
        setPlatforms((prevPlatforms) => prevPlatforms.slice(1))
    }

    return (
        <LinkCustomizationContext.Provider
            value={{
                links: getLoggedUserLinks(),
                setLinks
            }}
        >
            {children}
        </LinkCustomizationContext.Provider>
    )
}
