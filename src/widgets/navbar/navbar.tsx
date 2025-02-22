import { clsx } from 'clsx'

import LinkIcon from '@icons/icon-links-header.svg?react'
import PreviewIcon from '@icons/icon-preview-header.svg?react'
import ProfileDetailsIcon from '@icons/icon-profile-details-header.svg?react'

import { AppSection } from '@customTypes/index'

import Button from '@ui/button/button'
import DevLinks from '@ui/devlinks/devlinks'
import Tab from '@ui/tab/tab'

import useResizeObserver from '@hooks/useResizeObserver'

interface NavBarProps {
    activeTab: AppSection
    onTabClick: (tabId: AppSection) => void
}

export default function NavBar({ activeTab, onTabClick }: NavBarProps) {
    const { isMobile } = useResizeObserver()

    return (
        <div className={clsx('p-4 bg-white', 'rounded-b-xl', 'flex')}>
            <div className='w-full flex justify-between items-center'>
                <div className='w-13'>
                    <DevLinks logoSize={isMobile ? 'small' : 'large'} />
                </div>
                <div className='flex items-center'>
                    <Tab
                        id='links'
                        onClick={onTabClick}
                        Icon={LinkIcon}
                        isActive={activeTab === 'links'}
                        text={!isMobile ? 'Links' : undefined}
                        textPosition='right'
                    />
                    <Tab
                        id='details'
                        onClick={onTabClick}
                        Icon={ProfileDetailsIcon}
                        isActive={activeTab === 'details'}
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
