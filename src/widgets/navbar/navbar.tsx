import { clsx } from 'clsx'

import LinkIcon from '@icons/icon-links-header.svg?react'
import PreviewIcon from '@icons/icon-preview-header.svg?react'
import ProfileDetailsIcon from '@icons/icon-profile-details-header.svg?react'

import Button from '@ui/button/button'
import DevLinks from '@ui/devlinks/devlinks'
import Tab from '@ui/tab/tab'

import useResizeObserver from '@hooks/useResizeObserver'

export default function NavBar() {
    const { isMobile } = useResizeObserver()

    return (
        <div className={clsx('p-4 bg-white', 'rounded-b-xl', 'flex')}>
            <div className='w-full flex justify-between items-center'>
                <div className='w-13'>
                    <DevLinks logoSize={isMobile ? 'small' : 'large'} />
                </div>
                <div className='flex items-center'>
                    <Tab
                        icon={<LinkIcon />}
                        text={!isMobile ? 'Links' : undefined}
                        textPosition='right'
                    />
                    <Tab
                        icon={<ProfileDetailsIcon />}
                        text={!isMobile ? 'Profile Details' : undefined}
                        textPosition='right'
                    />
                </div>
                <Button.Secondary className={clsx({ 'px-4!': isMobile })}>
                    {isMobile ? <PreviewIcon /> : 'Preview'}
                </Button.Secondary>
            </div>
        </div>
    )
}
