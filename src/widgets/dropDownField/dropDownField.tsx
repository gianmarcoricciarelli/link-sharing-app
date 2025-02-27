import clsx from 'clsx'
import { ReactNode, useEffect, useRef, useState } from 'react'

import ChevronDownIcon from '@icons/icon-chevron-down.svg?react'

import { SvgrIcon } from '@customTypes/index'

import DropDownMenu from '@ui/dropDownMenu/dropDownMenu'
import LinkDescriptor from '@ui/linkDescriptor/linkDescriptor'

import useClickOutside from '@hooks/useClickOutside'

interface DropDownFieldProps {
    Icon: SvgrIcon
    defaultLabel: string
    children: ReactNode
}

export default function DropDownField({
    Icon,
    defaultLabel,
    children
}: DropDownFieldProps) {
    const dropDownMenuRef = useRef<HTMLDivElement>(null)

    const clickedOutSideMenu = useClickOutside(dropDownMenuRef)

    const [label, setLabel] = useState(defaultLabel)
    const [dropDownIsOpen, setDropDownIsOpen] = useState(false)

    const onMenuOptionClickHandler = (clickedMenuOption: string) => {
        setLabel(clickedMenuOption)
    }

    useEffect(() => {
        if (clickedOutSideMenu) {
            setDropDownIsOpen(true)
        }
    }, [clickedOutSideMenu])

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
                    'border-lsa-purple shadow-lsa-purple-blur': dropDownIsOpen
                }
            )}
        >
            <div
                className='flex items-center gap-3'
                onClick={() => setDropDownIsOpen((prevValue) => !prevValue)}
            >
                <LinkDescriptor Icon={Icon} descriptor={label} />
                <ChevronDownIcon
                    className={clsx('transition-all duration-300', {
                        'rotate-180': dropDownIsOpen
                    })}
                />
            </div>
            {dropDownIsOpen && (
                <DropDownMenu
                    ref={dropDownMenuRef}
                    onOptionClick={onMenuOptionClickHandler}
                >
                    {children}
                </DropDownMenu>
            )}
        </div>
    )
}
