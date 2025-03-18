import clsx from 'clsx'
import { useContext } from 'react'

import PhoneMockupIllustration from '@icons/illustration-phone-mockup.svg?react'

import PreviewLink from '@ui/previewLink/previewLink'

import { StoreContext } from '@contexts/storeContext/storeContext'

export default function PhoneMockup() {
    const {
        store: { loggedUser }
    } = useContext(StoreContext)

    return (
        <div className={clsx('w-140 p-4')}>
            <div className='w-full h-full bg-white rounded-xl flex justify-center items-center'>
                <div className='relative'>
                    <PhoneMockupIllustration />
                    {loggedUser?.links && loggedUser.links.length > 0 && (
                        <div className='absolute top-[278px] left-[35px] w-[237px] h-[300px] max-h-[300px] overflow-y-hidden flex flex-col gap-5'>
                            {loggedUser.links.map((l) => (
                                <PreviewLink
                                    key={l.platform}
                                    className='h-11'
                                    platform={l.platform}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
