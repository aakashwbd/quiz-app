import { Link } from '@inertiajs/react'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { logout } from '../../Store/Api/LoginSlice'
import Cookies from  'js-cookie';

const Header = ({currentUser}) => {
    const logoutMutate = useMutation(logout)

    const logoutHandler = async () => {
        let data = await logoutMutate.mutateAsync();
        if (data.status === 'success') {
            Cookies.remove('authToken')
            window.location.replace('/login');
        }
    }
    return (
        <div className="navbar bg-base-100 shadow-md px-10 sticky top-0 z-50">
            <div className='flex-1'>
                <Link href="/" className='text-primary'>Student Panel</Link>
            </div>
            <div className='flex-none'>
                <div className="dropdown dropdown-hover dropdown-end">
                    <div tabIndex="0">
                        <h6 className='text-sm'>{currentUser?.name}</h6>
                        <p className='text-xs'>Student</p>
                    </div>
                    <ul tabIndex="0" className="dropdown-content z-[1] menu shadow bg-base-100 rounded w-max">
                        <li>
                            <Link href="/profile">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <button onClick={logoutHandler}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
