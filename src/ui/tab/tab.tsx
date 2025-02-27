import clsx from 'clsx'
import { FunctionComponent, SVGProps } from 'react'

import { AppSection } from '@customTypes/index'

import Text from '@ui/text/text'

interface TabProps {
    id: AppSection
    Icon: FunctionComponent<SVGProps<SVGSVGElement>> & {
        title?: string
        titleId?: string
        desc?: string
        descId?: string
    }
    onClick: (tabId: AppSection) => void
    isActive: boolean
    text?: string
    textPosition?: 'left' | 'right'
}

export default function Tab({
    id,
    Icon,
    onClick,
    isActive,
    text,
    textPosition = 'left'
}: TabProps) {
    return (
        <div
            className={clsx(
                'group transition-all duration-300',
                'px-7 py-3 rounded-lg',
                'flex items-center gap-2',
                'hover:cursor-pointer hover:bg-lsa-light-purple',
                { 'bg-lsa-light-purple': isActive }
            )}
            onClick={() => onClick(id)}
        >
            {textPosition === 'left' && text && (
                <Text
                    className={clsx(
                        'transition-all duration-300 group-hover:text-lsa-purple',
                        {
                            'text-lsa-purple': isActive
                        }
                    )}
                    context='heading'
                    size='small'
                    fontStyle='medium'
                    color='lsa-grey'
                >
                    {text}
                </Text>
            )}
            <Icon
                className={clsx(
                    'transition-all duration-300 text-lsa-grey group-hover:text-lsa-purple',
                    {
                        'text-lsa-purple': isActive
                    }
                )}
            />
            {textPosition === 'right' && text && (
                <Text
                    className={clsx(
                        'transition-all duration-300 group-hover:text-lsa-purple',
                        {
                            'text-lsa-purple': isActive
                        }
                    )}
                    context='heading'
                    size='small'
                    fontStyle='medium'
                    color='lsa-grey'
                >
                    {text}
                </Text>
            )}
        </div>
    )
}
