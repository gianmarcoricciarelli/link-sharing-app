import { useContext } from 'react'

import Text from '@ui/text/text'

import useResizeObserver from '@hooks/useResizeObserver'

import ImageUploader from '@widgets/imageUploader/imageUploader'
import ProfileDetailsForm from '@widgets/profileDetailsForm/profileDetailForm'

import { DetailsContext } from '@contexts/detailsContext/detailsContext'

export default function Details() {
    const {
        detailsFormData,
        setDetailsFormData,
        detailsFormErrors,
        setDetailFormErrors,
        detailsFile,
        onProfilePictureChange
    } = useContext(DetailsContext)

    const { isMobile } = useResizeObserver()

    return (
        <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-2'>
                <Text className='text-2xl!' fontStyle='bold'>
                    Profile Details
                </Text>
                <Text context='body' size='medium' color='lsa-grey'>
                    Add your details to create a personal touch to your profile.
                </Text>
            </div>
            <div className='flex flex-col gap-6'>
                {isMobile && (
                    <>
                        <ProfileDetailsForm
                            detailsFormData={detailsFormData}
                            setDetailsFormData={setDetailsFormData}
                            detailsFormErrors={detailsFormErrors}
                            setDetailFormErrors={setDetailFormErrors}
                        />
                        <ImageUploader
                            profilePicture={detailsFile}
                            onProfilePictureChange={onProfilePictureChange}
                            detailsFormErrors={detailsFormErrors}
                        />
                    </>
                )}
                {!isMobile && (
                    <>
                        <ImageUploader
                            profilePicture={detailsFile}
                            onProfilePictureChange={onProfilePictureChange}
                            detailsFormErrors={detailsFormErrors}
                        />
                        <ProfileDetailsForm
                            detailsFormData={detailsFormData}
                            setDetailsFormData={setDetailsFormData}
                            detailsFormErrors={detailsFormErrors}
                            setDetailFormErrors={setDetailFormErrors}
                        />
                    </>
                )}
            </div>
        </div>
    )
}
