import { useEffect, useState } from 'react'

const MOBILE_THRESHOLD = 375

export default function useResizeObserver() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const observer = new ResizeObserver((entry) => {
            if (entry[0].contentRect.width <= MOBILE_THRESHOLD) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        })
        observer.observe(document.body)

        return () => {
            observer.disconnect()
        }
    }, [])

    return {
        isMobile
    }
}
