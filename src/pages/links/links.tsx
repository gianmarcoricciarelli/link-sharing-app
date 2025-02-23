import clsx from 'clsx'

import PhoneMockupIllustration from '@icons/illustration-empty.svg?react'

import Button from '@ui/button/button'
import Text from '@ui/text/text'

export default function Links() {
    return (
        <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-2'>
                <Text className='text-2xl!' style='bold'>
                    Customize your links
                </Text>
                <Text context='body' size='medium' color='lsa-grey'>
                    Add/edit/remove links below and then share all your profiles
                    with the world!
                </Text>
            </div>
            <div className='flex flex-col gap-6'>
                <Button.Secondary>+ Add new link</Button.Secondary>
                <div
                    className={clsx(
                        'p-5 bg-lsa-light-grey rounded-xl',
                        'flex flex-col gap-3'
                    )}
                >
                    <div className='text-center flex flex-col items-center gap-6'>
                        <PhoneMockupIllustration className='w-[124px] h-20' />
                        <Text className='text-2xl!' style='bold'>
                            Let's get you started
                        </Text>
                        <Text context='body' size='medium' color='lsa-grey'>
                            Use the “Add new link” button to get started. Once
                            you have more than one link, you can reorder and
                            edit them. We’re here to help you share your
                            profiles with everyone!
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}
