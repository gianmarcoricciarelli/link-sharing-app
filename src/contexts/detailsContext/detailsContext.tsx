/* eslint-disable react-refresh/only-export-components */
import {
    ChangeEventHandler,
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from 'react'
import { z } from 'zod'

import { StoreContext } from '@contexts/storeContext/storeContext'

export interface DetailContextProps {
    detailsFormData: {
        firstName: string
        lastName: string
        email: string
    }
    setDetailsFormData: Dispatch<
        SetStateAction<{ firstName: string; lastName: string; email: string }>
    >
    detailsFormErrors: {
        firstName: string
        lastName: string
        email: string
        dimensions: string
    }
    setDetailFormErrors: Dispatch<
        SetStateAction<{
            firstName: string
            lastName: string
            email: string
            dimensions: string
        }>
    >
    detailsFile: File | undefined
    setDetailsFile: Dispatch<SetStateAction<File | undefined>>
    onProfilePictureChange: ChangeEventHandler<HTMLInputElement>
    validateDetails: () => boolean
}

export const DetailsContext = createContext<DetailContextProps>({
    detailsFormData: {
        firstName: '',
        lastName: '',
        email: ''
    },
    setDetailsFormData: () => {},
    detailsFormErrors: {
        firstName: '',
        lastName: '',
        email: '',
        dimensions: ''
    },
    setDetailFormErrors: () => {},
    detailsFile: undefined,
    setDetailsFile: () => {},
    validateDetails: () => false,
    onProfilePictureChange: () => {}
})

export default function DetailsContextProvider({
    children
}: {
    children: ReactNode
}) {
    const {
        store: { loggedUser },
        setLoggedUser
    } = useContext(StoreContext)

    const [detailsFormData, setDetailsFormData] = useState({
        firstName: loggedUser?.firstName || '',
        lastName: loggedUser?.lastName || '',
        email: loggedUser?.email || ''
    })
    const [detailsFormErrors, setDetailFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dimensions: ''
    })
    const [detailsFile, setDetailsFile] = useState<File>()
    const [fileDimensions, setFileDimensions] = useState<{
        width: number
        height: number
    }>({ width: 0, height: 0 })

    const onProfilePictureChange: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        if (detailsFormErrors.dimensions) {
            setDetailFormErrors((prevErrors) => ({
                ...prevErrors,
                dimensions: ''
            }))
        }

        const profilePictureUrl = URL.createObjectURL(e.target.files![0])
        const image = new Image()

        image.onload = () => {
            setFileDimensions({ width: image.width, height: image.height })
            URL.revokeObjectURL(image.src)
        }
        image.src = profilePictureUrl

        setDetailsFile(e.target.files![0])
    }

    const validateDetails = () => {
        const detailsFormValidationSchema = z.object({
            firstName: z.string().min(1, 'This field is required'),
            lastName: z.string().min(1, 'This field is required'),
            email: z
                .string()
                .min(1, 'This field is required')
                .email('Invalid email'),
            width: z.number().max(1024, 'Wrong format'),
            height: z.number().max(1024, 'Wrong format')
        })
        const validatedData = detailsFormValidationSchema.safeParse({
            ...detailsFormData,
            ...fileDimensions
        })

        if (!validatedData.success) {
            const errors = validatedData.error.flatten().fieldErrors

            setDetailFormErrors({
                firstName: errors.firstName?.[0] || '',
                lastName: errors.lastName?.[0] || '',
                email: errors.email?.[0] || '',
                dimensions: errors.width?.[0] || errors.height?.[0] || ''
            })

            return false
        }

        setLoggedUser({
            ...loggedUser!,
            ...detailsFormData,
            profilePicture: detailsFile
        })

        return true
    }

    return (
        <DetailsContext.Provider
            value={{
                detailsFormData,
                setDetailsFormData,
                detailsFormErrors,
                setDetailFormErrors,
                detailsFile,
                setDetailsFile,
                validateDetails,
                onProfilePictureChange
            }}
        >
            {children}
        </DetailsContext.Provider>
    )
}
