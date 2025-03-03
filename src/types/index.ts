import { FunctionComponent, SVGProps } from 'react'

export type SvgrIcon = FunctionComponent<SVGProps<SVGSVGElement>> & {
    title?: string
    titleId?: string
    desc?: string
    descId?: string
}

export type Color =
    | 'lsa-dark-gray'
    | 'lsa-grey'
    | 'lsa-purple'
    | 'lsa-red'
    | 'white'

export type Platform =
    | 'GitHub'
    | 'Frontend Mentor'
    | 'Twitter'
    | 'LinkedIn'
    | 'YouTube'
    | 'Facebook'
    | 'Twitch'
    | 'Dev.to'
    | 'Codewars'
    | 'Codepen'
    | 'freeCodeCamp'
    | 'GitLab'
    | 'Hashnode'
    | 'Stack Overflow'

export type Link = {
    platform: Platform
    link: string
}

export type User = {
    id: number
    email: string
    password: string
    links: Link[]
    firstName?: string
    lastName?: string
    profilePicture?: File
}

export type LsaLocalStorageStore = {
    users: User[]
    loggedUser?: User
}

export type AppSection = 'links' | 'details' | 'preview'
