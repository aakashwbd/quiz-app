import React from 'react'
import { Link } from '@inertiajs/react'
import { adminNavList } from '../../Constants/adminNavList'

import { usePage } from '@inertiajs/react'

const SideBar = ({toggle = false}) => {
    const { component } = usePage()
    return (
        <ul className={`${toggle ? '' : 'hidden md:block'} menu bg-base-100 shadow-lg w-56 h-full fixed z-50`}>
            {adminNavList?.map((item, i) => (
                <li key={i}>
                    <Link href={item?.path} className={component === item?.component ? 'active' : ''}>{item?.name}</Link>
                </li>
            ))}
        </ul>
    )
}

export default SideBar
