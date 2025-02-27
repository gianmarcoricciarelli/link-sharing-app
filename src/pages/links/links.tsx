import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'
import clsx from 'clsx'
import { useContext } from 'react'

import PhoneMockupIllustration from '@icons/illustration-empty.svg?react'

import Button from '@ui/button/button'
import Text from '@ui/text/text'

import CustomLink from '@widgets/customLink/customLink'

import { LinkCustomizationContext } from '@contexts/linkCustomizationContext/linkCustomizationContext'

export default function Links() {
    const { links, addLink, platforms, swapLinks } = useContext(
        LinkCustomizationContext
    )

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    const onDragEndHandler = (e: DragEndEvent) => {
        const { active, over } = e

        if (active.id !== over?.id) {
            swapLinks(active.id as number, over!.id as number)
        }
    }

    return (
        <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-2'>
                <Text className='text-2xl!' fontStyle='bold'>
                    Customize your links
                </Text>
                <Text context='body' size='medium' color='lsa-grey'>
                    Add/edit/remove links below and then share all your profiles
                    with the world!
                </Text>
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEndHandler}
            >
                <div className='flex flex-col gap-6'>
                    <Button.Secondary
                        onClick={() =>
                            addLink({ link: '', platform: platforms[0] })
                        }
                    >
                        + Add new link
                    </Button.Secondary>
                    {links.length === 0 && (
                        <div
                            className={clsx(
                                'py-11 px-5 bg-lsa-light-grey rounded-xl',
                                'flex flex-col gap-3'
                            )}
                        >
                            <div className='text-center flex flex-col items-center gap-6'>
                                <PhoneMockupIllustration className='w-31 h-20' />
                                <Text className='text-2xl!' fontStyle='bold'>
                                    Let's get you started
                                </Text>
                                <Text
                                    context='body'
                                    size='medium'
                                    color='lsa-grey'
                                >
                                    Use the “Add new link” button to get
                                    started. Once you have more than one link,
                                    you can reorder and edit them. We're here to
                                    help you share your profiles with everyone!
                                </Text>
                            </div>
                        </div>
                    )}
                    {links.length > 0 && (
                        <SortableContext
                            items={links.map((_, index) => index)}
                            strategy={verticalListSortingStrategy}
                        >
                            {links.map((l, index) => (
                                <CustomLink
                                    key={l.platform}
                                    link={l}
                                    index={index}
                                />
                            ))}
                        </SortableContext>
                    )}
                </div>
            </DndContext>
        </div>
    )
}
