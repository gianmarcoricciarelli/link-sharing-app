import clsx from 'clsx'
import { ChangeEventHandler, useRef } from 'react'

import UploadImageIcon from '@icons/icon-upload-image.svg?react'

import Text from '@ui/text/text'

import { DetailContextProps } from '@contexts/detailsContext/detailsContext'

export default function ImageUploader({
    profilePicture,
    onProfilePictureChange,
    detailsFormErrors
}: {
    profilePicture?: File
    onProfilePictureChange: ChangeEventHandler<HTMLInputElement>
    detailsFormErrors: DetailContextProps['detailsFormErrors']
}) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <div
            className={clsx(
                'p-5',
                'bg-lsa-light-grey',
                'rounded-xl',
                'flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr] md:items-center gap-3 md:gap-4'
            )}
        >
            <Text context='body' size='medium' color='lsa-grey'>
                Profile picture
            </Text>
            <div
                className={clsx(
                    'h-[193px] w-[193px]',
                    'bg-lsa-light-purple',
                    'rounded-xl',
                    'flex flex-col justify-center items-center',
                    'relative'
                )}
                onClick={() => {
                    if (fileInputRef.current) {
                        fileInputRef.current.click()
                    }
                }}
            >
                {profilePicture && (
                    <img
                        className='h-[193px] w-[193px] rounded-xl'
                        src={URL.createObjectURL(profilePicture)}
                        onClick={() => {
                            if (fileInputRef.current) {
                                fileInputRef.current.click()
                            }
                        }}
                    />
                )}
                {profilePicture && (
                    <div className='w-full h-full bg-black rounded-xl opacity-50 absolute z-10' />
                )}
                <div
                    className={clsx(
                        'flex flex-col justify-center items-center',
                        { 'absolute z-20': profilePicture }
                    )}
                >
                    <UploadImageIcon
                        className={
                            profilePicture ? 'text-white' : 'text-lsa-purple'
                        }
                    />
                    <Text
                        context='heading'
                        size='small'
                        color={profilePicture ? 'white' : 'lsa-purple'}
                        fontStyle='bold'
                    >
                        {!profilePicture && (
                            <Text
                                context='heading'
                                size='small'
                                color={profilePicture ? 'white' : 'lsa-purple'}
                                fontStyle='bold'
                            >
                                +
                            </Text>
                        )}
                        {!profilePicture && ' '}
                        {profilePicture ? 'Change Image' : 'Upload Image'}
                    </Text>
                </div>
            </div>
            <input
                ref={fileInputRef}
                type='file'
                className='hidden'
                readOnly
                accept='.png,.jpg'
                onChange={onProfilePictureChange}
            />
            <Text context='body' size='small' color='lsa-grey'>
                Image must be below 1024x1024px. Use PNG or JPG format.
            </Text>
            {detailsFormErrors.dimensions && (
                <Text context='body' size='small' color='lsa-red'>
                    {detailsFormErrors.dimensions}
                </Text>
            )}
        </div>
    )
}
