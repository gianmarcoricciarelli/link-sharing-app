import clsx from 'clsx'
import { useContext } from 'react'
import { useNavigate } from 'react-router'

import Button from '@ui/button/button'
import PreviewLink from '@ui/previewLink/previewLink'
import Text from '@ui/text/text'

import { StoreContext } from '@contexts/storeContext/storeContext'

export default function Preview() {
    const navigateTo = useNavigate()

    const {
        store: { loggedUser }
    } = useContext(StoreContext)

    return (
        <div className='h-full flex flex-col items-center mobile:relative'>
            <div className='w-full mobile:h-[375px] mobile:p-6 mobile:bg-lsa-purple mobile:rounded-b-3xl'>
                <div
                    className={clsx(
                        'w-full',
                        'py-4 px-6',
                        'grid grid-cols-2 gap-4',
                        'mobile:bg-white mobile:rounded-xl',
                        'mobile:flex mobile:justify-between'
                    )}
                >
                    <Button.Secondary onClick={() => navigateTo('/details')}>
                        Back to Editor
                    </Button.Secondary>
                    <Button.Primary>Share Link</Button.Primary>
                </div>
            </div>
            <div
                className={clsx(
                    'w-[237px] grow flex flex-col justify-center items-center gap-14',
                    'mobile:absolute mobile:top-1/2 left-1/2 mobile:-translate-1/2',
                    'mobile:w-fit mobile:h-fit',
                    'mobile:px-14 mobile:py-12',
                    'mobile:bg-white mobile:rounded-3xl',
                    'mobile:shadow-lg'
                )}
            >
                {loggedUser?.firstName &&
                    loggedUser?.lastName &&
                    loggedUser?.email &&
                    loggedUser?.profilePicture && (
                        <div className='flex flex-col items-center gap-6'>
                            <div
                                className={clsx(
                                    'w-26 h-26',
                                    'rounded-full border-4 border-lsa-purple'
                                )}
                            >
                                <img
                                    src={URL.createObjectURL(
                                        loggedUser.profilePicture
                                    )}
                                />
                            </div>
                            <div className='flex flex-col gap-2 text-center'>
                                <Text
                                    context='heading'
                                    size='medium'
                                    fontStyle='bold'
                                >
                                    {`${loggedUser.firstName} ${loggedUser.lastName}`}
                                </Text>
                                <Text
                                    context='body'
                                    size='medium'
                                    color='lsa-grey'
                                >
                                    {loggedUser.email}
                                </Text>
                            </div>
                        </div>
                    )}
                {loggedUser?.links && loggedUser.links.length > 0 && (
                    <div className='w-full flex flex-col gap-5'>
                        {loggedUser.links.map((l) => (
                            <PreviewLink
                                key={l.platform}
                                platform={l.platform}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
