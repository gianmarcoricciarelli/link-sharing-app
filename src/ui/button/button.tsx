import clsx from 'clsx'
import { ComponentProps } from 'react'
import Text from '../text/text'

interface ButtonProps {
    type?: ComponentProps<'button'>['type']
    disabled?: ComponentProps<'button'>['disabled']
    onClick?: ComponentProps<'button'>['onClick']
    children: ComponentProps<'button'>['children']
}

function Primary({ type, disabled, onClick, children }: ButtonProps) {
    return (
        <button
            className={clsx(
                'px-7 py-3 rounded-lg',
                'bg-lsa-purple not-disabled:active:bg-lsa-purple-hover not-disabled:active:shadow-lsa-purple-blur disabled:bg-lsa-purple/25'
            )}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            <Text context='heading' size='small' color='white'>
                {children}
            </Text>
        </button>
    )
}

function Secondary({ type, disabled, onClick, children }: ButtonProps) {
    return (
        <button
            className={clsx(
                'px-7 py-3 rounded-lg',
                'border-[1px] border-lsa-purple disabled:border-lsa-purple/25',
                'not-disabled:active:bg-lsa-light-purple'
            )}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            <Text
                className={clsx({ 'text-lsa-purple/25!': disabled })}
                context='heading'
                size='small'
                color='lsa-purple'
            >
                {children}
            </Text>
        </button>
    )
}

const Button = {
    Primary,
    Secondary
}

export default Button
