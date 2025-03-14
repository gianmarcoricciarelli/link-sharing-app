import clsx from 'clsx'
import { ChangeEventHandler, MouseEventHandler, ReactNode, useRef } from 'react'

import Text from '../text/text'

interface TextFieldProps {
    placeholder: string
    name: string
    onChange: ChangeEventHandler<HTMLInputElement>
    className?: string
    icon?: ReactNode
    value?: string
    label?: string
    error?: string
}

export default function TextField({
    placeholder,
    name,
    onChange,
    className,
    icon,
    value,
    label,
    error
}: TextFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickHandler: MouseEventHandler<HTMLElement> = (e) => {
        if (e.target !== inputRef.current) {
            inputRef.current?.focus()
        }
    }

    return (
        <div
            className={clsx(
                className,
                'flex flex-col gap-1',
                'hover:cursor-pointer'
            )}
            onClick={onClickHandler}
        >
            {label && (
                <Text context='body' size='small'>
                    {label}
                </Text>
            )}
            <div
                className={clsx(
                    'transition-all duration-300',
                    'w-full',
                    'px-4 py-3',
                    'bg-white',
                    'border-[1px] border-lsa-borders rounded-lg focus-within:border-lsa-purple',
                    'focus-within:shadow-lsa-purple-blur',
                    'flex items-center gap-3',
                    {
                        'border-lsa-red focus-within:border-lsa-red focus-within:shadow-none!':
                            error
                    }
                )}
            >
                {icon && icon}
                <input
                    ref={inputRef}
                    className={clsx(
                        'min-w-0',
                        'outline-0',
                        'flex-1',
                        'text-lsa-dark-gray placeholder:text-lsa-grey',
                        'hover:cursor-pointer',
                        {
                            'text-lsa-red': error
                        }
                    )}
                    id={name}
                    name={name}
                    type='text'
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {error && (
                    <Text
                        className='whitespace-nowrap'
                        context='body'
                        size='small'
                        color='lsa-red'
                    >
                        {error}
                    </Text>
                )}
            </div>
        </div>
    )
}
