import clsx from 'clsx'

import ArrowRightIcon from '@icons/icon-arrow-right.svg?react'
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

import { Platform, SvgrIcon } from '@customTypes/index'

import Text from '@ui/text/text'

const platformsColors: Record<Platform, string> = {
    Codepen: '#1A1A1A',
    Codewars: '#8A1A50',
    'Dev.to': '#333333',
    Facebook: '#2442AC',
    'Frontend Mentor': '#FFFFFF',
    GitHub: '#1A1A1A',
    GitLab: '#EB4925',
    Hashnode: '#0330D1',
    LinkedIn: '#2D68FF',
    'Stack Overflow': '#EC7100',
    Twitch: '#EE3FC8',
    Twitter: '#43B7E9',
    YouTube: '#EE3939',
    freeCodeCamp: '#302267'
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

export default function PreviewLink({ platform }: { platform: Platform }) {
    const Icon = iconForPlatForm[platform]

    return (
        <div
            style={{ backgroundColor: platformsColors[platform] }}
            className={clsx(
                'w-full p-4',
                'flex justify-between items-center',
                'rounded-lg',
                'cursor-pointer',
                '[&_path]:fill-white'
            )}
        >
            <div className='flex items-center gap-2'>
                <Icon />
                <Text context='body' size='medium' color='white'>
                    {platform}
                </Text>
            </div>
            <ArrowRightIcon />
        </div>
    )
}
