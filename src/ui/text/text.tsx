import clsx from 'clsx'
import {
    CSSProperties,
    MouseEventHandler,
    ReactNode,
    TouchEventHandler
} from 'react'

import { Color } from '@customTypes/index'

interface TextProps {
    style?: CSSProperties
    className?: string
    draggable?: boolean
    context?: 'heading' | 'body'
    size?: 'medium' | 'small'
    fontStyle?: 'medium' | 'bold'
    color?: Color
    onClick?: MouseEventHandler<HTMLSpanElement>
    onTouchStart?: TouchEventHandler<HTMLSpanElement>
    children: ReactNode
}

export default function Text({
    style,
    className,
    draggable,
    context = 'heading',
    size = 'medium',
    fontStyle,
    color = 'lsa-dark-gray',
    onClick,
    onTouchStart,
    children
}: TextProps) {
    return (
        <span
            style={style}
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
                'font-bold': fontStyle === 'bold',
                'font-medium': fontStyle == 'medium'
            })}
            draggable={draggable}
            onTouchStart={onTouchStart}
            onClick={onClick}
        >
            {children}
        </span>
    )
}
