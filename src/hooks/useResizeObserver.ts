import { useEffect, useState } from 'react'

const MOBILE_THRESHOLD = 375
const TABLET_THRESHOLD = 768

export default function useResizeObserver() {
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)

    useEffect(() => {
        const observer = new ResizeObserver((entry) => {
            if (entry[0].contentRect.width <= MOBILE_THRESHOLD) {
                setIsMobile(true)
                setIsTablet(false)
            } else if (entry[0].contentRect.width <= TABLET_THRESHOLD) {
                setIsMobile(false)
                setIsTablet(true)
            } else {
                setIsMobile(false)
                setIsTablet(false)
            }
        })
        observer.observe(document.body)

        return () => {
            observer.disconnect()
        }
    }, [])

    return {
        isMobile,
        isTablet
    }
}
