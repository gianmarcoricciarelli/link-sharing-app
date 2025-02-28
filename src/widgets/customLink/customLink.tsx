import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { ChangeEventHandler, useContext, useState } from 'react'

import DragAndDropIcon from '@icons/icon-drag-and-drop.svg?react'
import LinkIcon from '@icons/icon-links-header.svg?react'

import { Link } from '@customTypes/index'

import DropDownField from '@ui/dropDownField/dropDownField'
import LinkDescriptor from '@ui/linkDescriptor/linkDescriptor'
import Text from '@ui/text/text'
import TextField from '@ui/textField/textField'

import useResizeObserver from '@hooks/useResizeObserver'

import { LinkCustomizationContext } from '@contexts/linkCustomizationContext/linkCustomizationContext'

interface CustomLinkProps {
    link: Link
    index: number
}

export default function CustomLink({ link, index }: CustomLinkProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({ id: index })

    const { platforms, iconForPlatForm, updateLink, removeLink } = useContext(
        LinkCustomizationContext
    )

    const isMobile = useResizeObserver()

    const [typedLink, setTypedLink] = useState(link.link)

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setTypedLink(e.target.value)
        updateLink(index, { link: e.target.value, platform: link.platform })
    }

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                touchAction: 'none'
            }}
            className={clsx(
                'p-5',
                'bg-lsa-light-grey rounded-xl',
                'flex flex-col gap-3'
            )}
            {...attributes}
        >
            <div className='flex items-baseline justify-between'>
                <div className='flex items-center gap-2'>
                    <div
                        ref={setActivatorNodeRef}
                        className='cursor-grab'
                        {...listeners}
                    >
                        <DragAndDropIcon />
                    </div>
                    <Text
                        context='body'
                        size='medium'
                        fontStyle='bold'
                        color='lsa-grey'
                    >
                        {`Link #${index + 1}`}
                    </Text>
                </div>
                <Text
                    className='select-none'
                    draggable={false}
                    context='body'
                    size='medium'
                    color='lsa-grey'
                    onClick={isMobile ? undefined : () => removeLink(link)}
                    onTouchStart={
                        !isMobile ? undefined : () => removeLink(link)
                    }
                >
                    Remove
                </Text>
            </div>
            <div className='flex flex-col gap-1'>
                <Text context='body' size='small'>
                    Platform
                </Text>
                <DropDownField
                    button={
                        <LinkDescriptor
                            Icon={iconForPlatForm[link.platform]}
                            descriptor={link.platform}
                        />
                    }
                >
                    {platforms.map((p) => (
                        <LinkDescriptor
                            key={p}
                            Icon={iconForPlatForm[p]}
                            descriptor={p}
                            onClick={() =>
                                updateLink(index, { link: '', platform: p })
                            }
                            onTouchStart={() =>
                                updateLink(index, { link: '', platform: p })
                            }
                        />
                    ))}
                </DropDownField>
            </div>
            <TextField
                name='link'
                label='Link'
                placeholder={`e.g https://www.${link.platform.includes(' ') ? link.platform.split(' ').join('-').toLowerCase() : link.platform.toLowerCase()}.com`}
                value={typedLink}
                icon={<LinkIcon className='text-lsa-grey' />}
                onChange={onChangeHandler}
            />
        </div>
    )
}
