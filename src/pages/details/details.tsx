import Text from '@ui/text/text'

import ImageUploader from '@widgets/imageUploader/imageUploader'
import ProfileDetailsForm from '@widgets/profileDetailsForm/profileDetailForm'

export default function Details() {
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
                <ProfileDetailsForm />
                <ImageUploader />
            </div>
        </div>
    )
}
