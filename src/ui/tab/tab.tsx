import clsx from 'clsx'
import { cloneElement, ReactElement } from 'react'

import Text from '@ui/text/text'

interface TabProps {
    icon: ReactElement<{ className?: string }>
    text?: string
}

export default function Tab({ icon, text }: TabProps) {
    return (
        <div
            className={clsx(
                'group transition-all duration-300',
                'px-7 py-3 rounded-lg',
                'flex items-center gap-2',
                'hover:cursor-pointer hover:bg-lsa-light-purple'
            )}
        >
            {cloneElement(icon, {
                className:
                    'transition-all duration-300 text-lsa-grey group-hover:text-lsa-purple'
            })}
            {text && (
                <Text
                    className='transition-all duration-300 group-hover:text-lsa-purple'
                    context='heading'
                    size='small'
                    color='lsa-grey'
                >
                    {text}
                </Text>
            )}
        </div>
    )
}
