import clsx from 'clsx'
import { ComponentProps } from 'react'

import Text from '../text/text'

interface ButtonProps {
    className?: string
    type?: ComponentProps<'button'>['type']
    disabled?: ComponentProps<'button'>['disabled']
    onClick?: ComponentProps<'button'>['onClick']
    children: ComponentProps<'button'>['children']
}

function Primary({
    className,
    type,
    disabled,
    onClick,
    children
}: ButtonProps) {
    return (
        <button
            className={clsx(
                className,
                'px-7 py-3',
                'bg-lsa-purple not-disabled:active:bg-lsa-purple-hover disabled:bg-lsa-purple/25',
                'not-disabled:active:shadow-lsa-purple-blur',
                'rounded-lg cursor-pointer',
                'transition-all duration-300'
            )}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            <Text
                context='heading'
                size='small'
                fontStyle='medium'
                color='white'
            >
                {children}
            </Text>
        </button>
    )
}

function Secondary({
    className,
    type,
    disabled,
    onClick,
    children
}: ButtonProps) {
    return (
        <button
            className={clsx(
                'px-7 py-3 rounded-lg cursor-pointer',
                'border-[1px] border-lsa-purple disabled:border-lsa-purple/25',
                'not-disabled:active:bg-lsa-light-purple',
                className
            )}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {typeof children === 'string' ? (
                <Text
                    className={clsx({ 'text-lsa-purple/25!': disabled })}
                    context='heading'
                    size='small'
                    fontStyle='medium'
                    color='lsa-purple'
                >
                    {children}
                </Text>
            ) : (
                children
            )}
        </button>
    )
}

const Button = {
    Primary,
    Secondary
}

export default Button
