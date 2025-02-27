import clsx from 'clsx'

import { Platform, SvgrIcon } from '@customTypes/index'

import Text from '@ui/text/text'

interface LinkDescriptorProps {
    Icon: SvgrIcon
    descriptor: Platform
    onClick?: (clickedDescriptor: Platform) => void
    onTouchStart?: (clickedDescriptor: Platform) => void
}

export default function LinkDescriptor({
    Icon,
    descriptor,
    onClick,
    onTouchStart
}: LinkDescriptorProps) {
    return (
        <div
            className={clsx('flex items-center gap-3')}
            onClick={onClick ? () => onClick(descriptor) : undefined}
            onTouchStart={
                onTouchStart ? () => onTouchStart(descriptor) : undefined
            }
        >
            <Icon />
            <Text className='grow' context='body' size='medium'>
                {descriptor}
            </Text>
        </div>
    )
}
