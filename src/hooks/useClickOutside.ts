import { RefObject, useEffect, useState } from 'react'

export default function useClickOutside(
    ref: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[]
): boolean {
    const [clickedOutside, setClickedOutside] = useState(false)

    useEffect(() => {
        function _onClickOutside(e: MouseEvent | TouchEvent) {
            if (Array.isArray(ref)) {
                if (
                    ref.every(
                        (r) =>
                            r.current && !r.current.contains(e.target as Node)
                    )
                ) {
                    setClickedOutside(true)
                } else if (
                    ref.some(
                        (r) => r.current && r.current.contains(e.target as Node)
                    )
                ) {
                    setClickedOutside(false)
                }
            } else if (ref.current) {
                setClickedOutside(ref.current.contains(e.target as Node))
            }
        }

        document.addEventListener('mousedown', _onClickOutside)
        document.addEventListener('touchstart', _onClickOutside)

        return () => {
            document.removeEventListener('mousedown', _onClickOutside)
            document.removeEventListener('touchstart', _onClickOutside)
        }
    }, [ref])

    return clickedOutside
}
