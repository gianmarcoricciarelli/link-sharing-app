import clsx from 'clsx'

import { SvgrIcon } from '@customTypes/index'

import Text from '@ui/text/text'

interface LinkDescriptorProps {
    Icon: SvgrIcon
    descriptor: string
    onClick?: (clickedDescriptor: string) => void
}

export default function LinkDescriptor({
    Icon,
    descriptor,
    onClick
}: LinkDescriptorProps) {
    return (
        <div
            className={clsx('flex items-center gap-3')}
            onClick={onClick ? () => onClick(descriptor) : undefined}
        >
            <Icon />
            <Text className='grow' context='body' size='medium'>
                {descriptor}
            </Text>
        </div>
    )
}
