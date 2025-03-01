import clsx from 'clsx'
import { ChangeEventHandler, useRef, useState } from 'react'

import UploadImageIcon from '@icons/icon-upload-image.svg?react'

import Text from '@ui/text/text'

export default function ImageUploader() {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [file, setFile] = useState('')
    console.log(' ImageUploader ~ file:', file)

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
            {file ? (
                <img
                    className='h-[193px] w-[193px] rounded-xl'
                    src={file}
                    onClick={() => {
                        if (fileInputRef.current) {
                            fileInputRef.current.click()
                        }
                    }}
                />
            ) : (
                <div
                    className={clsx(
                        'h-[193px] w-[193px]',
                        'bg-lsa-light-purple',
                        'rounded-xl',
                        'flex flex-col justify-center items-center'
                    )}
                    onClick={() => {
                        if (fileInputRef.current) {
                            fileInputRef.current.click()
                        }
                    }}
                >
                    <UploadImageIcon />
                    <Text
                        context='heading'
                        size='small'
                        color='lsa-purple'
                        fontStyle='bold'
                    >
                        <Text
                            context='heading'
                            size='small'
                            color='lsa-purple'
                            fontStyle='bold'
                        >
                            +
                        </Text>{' '}
                        Upload Image
                    </Text>
                </div>
            )}
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
