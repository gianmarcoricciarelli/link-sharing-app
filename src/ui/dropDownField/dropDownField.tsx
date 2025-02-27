import clsx from 'clsx'
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'

import ChevronDownIcon from '@icons/icon-chevron-down.svg?react'

import DropDownMenu from '@ui/dropDownMenu/dropDownMenu'

import useClickOutside from '@hooks/useClickOutside'

interface DropDownFieldProps {
    button: ReactElement
    children: ReactNode
}

export default function DropDownField({
    button,
    children
}: DropDownFieldProps) {
    const dropDownButtonRef = useRef<HTMLDivElement>(null)
    const dropDownMenuRef = useRef<HTMLDivElement>(null)

    const clickedOutside = useClickOutside([dropDownButtonRef, dropDownMenuRef])

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (clickedOutside) {
            setIsOpen(false)
        }
    }, [clickedOutside])

    return (
        <div
            className={clsx(
                'px-4 py-3',
                'border-[1px] border-lsa-borders rounded-lg',
                'flex flex-col',
                'transition-all duration-300',
                'relative',
                'cursor-pointer',
                {
                    'border-lsa-purple shadow-lsa-purple-blur': isOpen
                }
            )}
        >
            <div
                ref={dropDownButtonRef}
                className='flex justify-between items-center gap-3'
                onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
                onTouchStart={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
            >
                {button}
                <ChevronDownIcon
                    className={clsx('transition-all duration-300', {
                        'rotate-180': isOpen
                    })}
                />
            </div>
            {isOpen && (
                <DropDownMenu ref={dropDownMenuRef}>{children}</DropDownMenu>
            )}
        </div>
    )
}
