import DevLinksLargeLogo from '@icons/logo-devlinks-large.svg?react'
import DevLinksSmallLogo from '@icons/logo-devlinks-small.svg?react'

export default function DevLinks({
    logoSize = 'small'
}: {
    logoSize?: 'small' | 'large'
}) {
    return logoSize === 'small' ? <DevLinksSmallLogo /> : <DevLinksLargeLogo />
}
