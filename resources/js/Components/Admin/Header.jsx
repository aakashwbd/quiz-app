import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { logout } from '../../Store/Api/LoginSlice'
import Cookies from 'js-cookie'

const Header = ({ toggleHandler = () => { } , currentUser}) => {
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
                <a href="" className='text-primary'>Admin Panel</a>
            </div>
            <div className='flex-none'>
                <button onClick={toggleHandler} className="flex items-center justify-center flex-col gap-1 border p-2 rounded md:hidden mr-2">
                    <div className="w-[16px] h-[1px] bg-black"></div>
                    <div className="w-[16px] h-[1px] bg-black"></div>
                    <div className="w-[16px] h-[1px] bg-black"></div>
                </button>
                <div className="dropdown dropdown-hover dropdown-end">
                    <div tabIndex="0">
                        <h6 className='text-sm'>{currentUser?.name}</h6>
                        <p className='text-xs'>{currentUser?.role_id == 1 ? 'Admin': ""}</p>
                    </div>
                    <ul tabIndex="0" className="dropdown-content z-[1] menu shadow bg-base-100 rounded w-max">
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
