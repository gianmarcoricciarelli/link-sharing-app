import clsx from 'clsx'
import { Children, forwardRef, Fragment, ReactNode } from 'react'

const DropDownMenu = forwardRef<HTMLDivElement, { children: ReactNode }>(
    function DropDownMenu({ children }: { children: ReactNode }, ref) {
        const childrenMap = Children.toArray(children)

        return (
            <div
                ref={ref}
                className={clsx(
                    'w-full px-4 py-3',
                    'bg-white rounded-lg overflow-auto',
                    'flex flex-col gap-3',
                    'absolute z-10',
                    'left-0 bottom-0 translate-y-full-with-offset'
                )}
            >
                {childrenMap.map((child, index) => (
                    <Fragment key={index}>
                        {child}
                        <div className='h-[1px] bg-lsa-borders' />
                    </Fragment>
                ))}
            </div>
        )
    }
)

export default DropDownMenu
