import { Color } from '@/types'
import clsx from 'clsx'
import { ReactNode } from 'react'

interface TextProps {
    className?: string
    context?: 'heading' | 'body'
    size?: 'medium' | 'small'
    style?: 'bold'
    color?: Color
    children: ReactNode
}

export default function Text({
    className,
    context = 'heading',
    size = 'medium',
    style,
    color = 'lsa-dark-gray',
    children
}: TextProps) {
    return (
        <span
            className={clsx(className, {
                'text-lsa-dark-gray': color === 'lsa-dark-gray',
                'text-lsa-grey': color === 'lsa-grey',
                'text-lsa-purple': color === 'lsa-purple',
                'text-lsa-red': color === 'lsa-red',
                'text-white': color === 'white',
                'text-[32px]': context === 'heading' && size === 'medium',
                'text-base':
                    (context === 'heading' && size === 'small') ||
                    (context === 'body' && size === 'medium'),
                'text-xs': context === 'body' && size === 'small',
                'font-bold': style === 'bold'
            })}
        >
            {children}
        </span>
    )
}
