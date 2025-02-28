import clsx from 'clsx'
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'

import ChevronDownIcon from '@icons/icon-chevron-down.svg?react'

import DropDownMenu from '@ui/dropDownMenu/dropDownMenu'

import useClickOutside from '@hooks/useClickOutside'
import useResizeObserver from '@hooks/useResizeObserver'

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
    const isMobile = useResizeObserver()

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (clickedOutside) {
            setIsOpen(false)
        }
    }, [clickedOutside])

    return (
        <div
            ref={dropDownButtonRef}
            className={clsx(
                'px-4 py-3',
                'bg-white',
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
                className='flex justify-between items-center gap-3'
                onClick={
                    isMobile
                        ? undefined
                        : () => setIsOpen((prevIsOpen) => !prevIsOpen)
                }
                onTouchStart={
                    !isMobile
                        ? undefined
                        : () => setIsOpen((prevIsOpen) => !prevIsOpen)
                }
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
