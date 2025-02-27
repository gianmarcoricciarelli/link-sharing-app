/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from 'react'

import CodePenIcon from '@icons/icon-codepen.svg?react'
import CodeWarsIcon from '@icons/icon-codewars.svg?react'
import DevToIcon from '@icons/icon-devto.svg?react'
import FacebookIcon from '@icons/icon-facebook.svg?react'
import FreeCodeCampIcon from '@icons/icon-freecodecamp.svg?react'
import FrontendMentorIcon from '@icons/icon-frontend-mentor.svg?react'
import GitHubIcon from '@icons/icon-github.svg?react'
import GitLabIcon from '@icons/icon-gitlab.svg?react'
import HashnodeIcon from '@icons/icon-hashnode.svg?react'
import LinkedInIcon from '@icons/icon-linkedin.svg?react'
import StackOverflowIcon from '@icons/icon-stack-overflow.svg?react'
import TwitchIcon from '@icons/icon-twitch.svg?react'
import TwitterIcon from '@icons/icon-twitter.svg?react'
import YouTubeIcon from '@icons/icon-youtube.svg?react'

import {
    Link,
    LsaLocalStorageStore,
    Platform,
    SvgrIcon,
    User
} from '@customTypes/index'

import { StoreContext } from '@contexts/storeContext/storeContext'

interface LinkCustomizationContextProps {
    links: Link[]
    addLink: (link: Link) => void
    updateLink: (index: number, link: Link) => void
    removeLink: (link: Link) => void
    swapLinks: (activeIndex: number, overIndex: number) => void
    platforms: Platform[]
    iconForPlatForm: Record<Platform, SvgrIcon>
}

export const LinkCustomizationContext =
    createContext<LinkCustomizationContextProps>({
        links: [],
        addLink: () => {},
        updateLink: () => {},
        removeLink: () => {},
        swapLinks: () => {},
        platforms: [],
        iconForPlatForm: {
            GitHub: GitHubIcon,
            'Frontend Mentor': FrontendMentorIcon,
            Twitter: TwitterIcon,
            LinkedIn: LinkedInIcon,
            YouTube: YouTubeIcon,
            Facebook: FacebookIcon,
            Twitch: TwitchIcon,
            'Dev.to': DevToIcon,
            Codewars: CodeWarsIcon,
            Codepen: CodePenIcon,
            freeCodeCamp: FreeCodeCampIcon,
            GitLab: GitLabIcon,
            Hashnode: HashnodeIcon,
            'Stack Overflow': StackOverflowIcon
        }
    })

export function LinkCustomizationContextProvider({
    children
}: {
    children: ReactNode
}) {
    const { setStore, getLoggedUserLinks } = useContext(StoreContext)

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

    const updateStore = (
        prevStore: LsaLocalStorageStore,
        newLinks: Link[]
    ): LsaLocalStorageStore => {
        const newLoggedUser: User = {
            ...prevStore.loggedUser!,
            links: newLinks
        }
        const newUsers = [
            ...prevStore.users.filter((u) => u.email !== newLoggedUser.email),
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
    }

    const addLink = (newLink: Link) => {
        setStore((prevStore) => {
            const newLinks = [...(prevStore.loggedUser?.links || []), newLink]

            return updateStore(prevStore, newLinks)
        })
        setPlatforms((prevPlatforms) =>
            prevPlatforms.filter((p) => p !== newLink.platform)
        )
    }

    const updateLink = (index: number, link: Link) => {
        setStore((prevStore) => {
            const newLinks = [...prevStore.loggedUser!.links]
            newLinks[index] = link

            setPlatforms((prevPlatforms) => [
                prevStore.loggedUser!.links[index].platform,
                ...prevPlatforms.filter((p) => p !== link.platform)
            ])

            return updateStore(prevStore, newLinks)
        })
    }

    const removeLink = (link: Link) => {
        setStore((prevStore) => {
            const newLinks = [...prevStore.loggedUser!.links].filter(
                (l) => l.platform !== link.platform
            )
            return updateStore(prevStore, newLinks)
        })
        setPlatforms((prevPlatforms) => [link.platform, ...prevPlatforms])
    }

    const swapLinks = (activeIndex: number, overIndex: number) => {
        setStore((prevStore) => {
            const newLinks = [...prevStore.loggedUser!.links]

            const tmp = newLinks[overIndex]
            newLinks[overIndex] = newLinks[activeIndex]
            newLinks[activeIndex] = tmp

            return updateStore(prevStore, newLinks)
        })
    }

    const iconForPlatForm: Record<Platform, SvgrIcon> = {
        GitHub: GitHubIcon,
        'Frontend Mentor': FrontendMentorIcon,
        Twitter: TwitterIcon,
        LinkedIn: LinkedInIcon,
        YouTube: YouTubeIcon,
        Facebook: FacebookIcon,
        Twitch: TwitchIcon,
        'Dev.to': DevToIcon,
        Codewars: CodeWarsIcon,
        Codepen: CodePenIcon,
        freeCodeCamp: FreeCodeCampIcon,
        GitLab: GitLabIcon,
        Hashnode: HashnodeIcon,
        'Stack Overflow': StackOverflowIcon
    }

    return (
        <LinkCustomizationContext.Provider
            value={{
                links: getLoggedUserLinks(),
                addLink,
                updateLink,
                removeLink,
                swapLinks,
                platforms,
                iconForPlatForm
            }}
        >
            {children}
        </LinkCustomizationContext.Provider>
    )
}
