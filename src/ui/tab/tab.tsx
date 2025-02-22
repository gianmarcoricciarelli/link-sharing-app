import clsx from 'clsx'
import { cloneElement, ReactElement } from 'react'

import { AppSection } from '@customTypes/index'

import Text from '@ui/text/text'

interface TabProps {
    id: AppSection
    icon: ReactElement<{ className?: string }>
    onClick: (tabId: AppSection) => void
    text?: string
    textPosition?: 'left' | 'right'
}

export default function Tab({
    id,
    icon,
    onClick,
    text,
    textPosition = 'left'
}: TabProps) {
    return (
        <div
            className={clsx(
                'group transition-all duration-300',
                'px-7 py-3 rounded-lg',
                'flex items-center gap-2',
                'hover:cursor-pointer hover:bg-lsa-light-purple'
            )}
            onClick={() => onClick(id)}
        >
            {textPosition === 'left' && text && (
                <Text
                    className='transition-all duration-300 group-hover:text-lsa-purple'
                    context='heading'
                    size='small'
                    style='medium'
                    color='lsa-grey'
                >
                    {text}
                </Text>
            )}
            {cloneElement(icon, {
                className:
                    'transition-all duration-300 text-lsa-grey group-hover:text-lsa-purple'
            })}
            {textPosition === 'right' && text && (
                <Text
                    className='transition-all duration-300 group-hover:text-lsa-purple'
                    context='heading'
                    size='small'
                    style='medium'
                    color='lsa-grey'
                >
                    {text}
                </Text>
            )}
        </div>
    )
}
