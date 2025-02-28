import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { useContext } from 'react'

import DragAndDropIcon from '@icons/icon-drag-and-drop.svg?react'

import { Link } from '@customTypes/index'

import DropDownField from '@ui/dropDownField/dropDownField'
import LinkDescriptor from '@ui/linkDescriptor/linkDescriptor'
import Text from '@ui/text/text'

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
                    onClick={() => {
                        removeLink(link)
                    }}
                    onTouchStart={(e) => {
                        e.preventDefault()
                        removeLink(link)
                    }}
                >
                    Remove
                </Text>
            </div>
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
    )
}
