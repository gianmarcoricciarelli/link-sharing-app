import clsx from 'clsx'
import { ChangeEventHandler, useRef, useState } from 'react'

import UploadImageIcon from '@icons/icon-upload-image.svg?react'

import Text from '@ui/text/text'

export default function ImageUploader() {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [file, setFile] = useState('')

    const onFileLoadHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFile(URL.createObjectURL(e.target.files![0]))
    }

    return (
        <div
            className={clsx(
                'p-5',
                'bg-lsa-light-grey',
                'rounded-xl',
                'flex flex-col gap-3'
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
                {file && (
                    <img
                        className='h-[193px] w-[193px] rounded-xl'
                        src={file}
                        onClick={() => {
                            if (fileInputRef.current) {
                                fileInputRef.current.click()
                            }
                        }}
                    />
                )}
                {file && (
                    <div className='w-full h-full bg-black rounded-xl opacity-50 absolute z-10' />
                )}
                <div
                    className={clsx(
                        'flex flex-col justify-center items-center',
                        { 'absolute z-20': file }
                    )}
                >
                    <UploadImageIcon
                        className={file ? 'text-white' : 'text-lsa-purple'}
                    />
                    <Text
                        context='heading'
                        size='small'
                        color={file ? 'white' : 'lsa-purple'}
                        fontStyle='bold'
                    >
                        {!file && (
                            <Text
                                context='heading'
                                size='small'
                                color={file ? 'white' : 'lsa-purple'}
                                fontStyle='bold'
                            >
                                +
                            </Text>
                        )}
                        {!file && ' '}
                        {file ? 'Change Image' : 'Upload Image'}
                    </Text>
                </div>
            </div>
            <input
                ref={fileInputRef}
                type='file'
                className='hidden'
                readOnly
                accept='.png,.jpg'
                onChange={onFileLoadHandler}
            />
            <Text context='body' size='small' color='lsa-grey'>
                Image must be below 1024x1024px. Use PNG or JPG format.
            </Text>
        </div>
    )
}
