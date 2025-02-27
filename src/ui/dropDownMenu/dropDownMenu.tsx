import clsx from 'clsx'
import {
    Children,
    cloneElement,
    forwardRef,
    Fragment,
    ReactElement,
    ReactNode
} from 'react'

interface DropDownMenuProps {
    onOptionClick: (clickedOption: string) => void
    children: ReactNode
}

const DropDownMenu = forwardRef<HTMLDivElement, DropDownMenuProps>(
    function DropDownMenu({ onOptionClick, children }: DropDownMenuProps, ref) {
        return (
            <div
                ref={ref}
                className={clsx(
                    'px-4 py-3',
                    'bg-white',
                    'flex flex-col gap-3',
                    'absolute',
                    'left-0 bottom-0 -translate-y-[calc(100%_+_8px)]'
                )}
            >
                {Children.map(children, (Child, index) => (
                    <Fragment key={index}>
                        {cloneElement(
                            Child as ReactElement<{
                                onClick: typeof onOptionClick
                            }>,
                            { onClick: onOptionClick }
                        )}
                        <div className='h-[1px] bg-lsa-borders' />
                    </Fragment>
                ))}
            </div>
        )
    }
)

export default DropDownMenu
