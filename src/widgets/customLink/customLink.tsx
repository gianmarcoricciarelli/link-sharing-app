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
    const { platforms, iconForPlatForm, updateLink } = useContext(
        LinkCustomizationContext
    )

    return (
        <div
            className={clsx(
                'p-5',
                'bg-lsa-light-grey rounded-xl',
                'flex flex-col gap-3'
            )}
        >
            <div className='flex items-baseline justify-between'>
                <div className='flex items-center gap-2'>
                    <DragAndDropIcon />
                    <Text
                        context='body'
                        size='medium'
                        style='bold'
                        color='lsa-grey'
                    >
                        {`Link #${index + 1}`}
                    </Text>
                </div>
                <Text context='body' size='medium' color='lsa-grey'>
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
                    />
                ))}
            </DropDownField>
        </div>
    )
}
