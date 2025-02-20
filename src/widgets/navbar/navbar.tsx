import { clsx } from 'clsx'

import LinkIcon from '@icons/icon-links-header.svg?react'
import PreviewIcon from '@icons/icon-preview-header.svg?react'
import ProfileDetailsIcon from '@icons/icon-profile-details-header.svg?react'

import Button from '@ui/button/button'
import DevLinks from '@ui/devlinks/devlinks'
import Tab from '@ui/tab/tab'

export default function NavBar() {
    return (
        <div className={clsx('p-4 bg-white', 'rounded-b-xl', 'flex')}>
            <div className='w-full flex justify-between items-center'>
                <div className='w-13'>
                    <DevLinks logoSize='small' />
                </div>
                <div className='flex items-center'>
                    <Tab icon={<LinkIcon />} />
                    <Tab icon={<ProfileDetailsIcon />} />
                </div>
                <Button.Secondary className='px-4!'>
                    <PreviewIcon />
                </Button.Secondary>
            </div>
        </div>
    )
}
