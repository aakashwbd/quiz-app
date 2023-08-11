import React, { useEffect, useState } from 'react'
import Header from '../Components/Admin/Header'
import SideBar from '../Components/Admin/SideBar'
import Cookies from 'js-cookie'
import { tokenDecoder } from '../Utils/helpers'

const AdminLayout = ({ children }) => {
    const [toggle, setToggle] = useState(false)

    const toggleHandler = () => {
        setToggle(!toggle)
    }
    const [currentUser, setCurrentUser] = useState({
        name: null,
        role_id: null
    })

    useEffect(() => {
        let token = Cookies.get('authToken') || null
        if (!token) {
            window.location.replace('/login');
        }
        let { myDecodedToken, isMyTokenExpired } = tokenDecoder(JSON.parse(token))
        if (isMyTokenExpired) {
            window.location.replace('/login');
        }
        if (myDecodedToken) {
            setCurrentUser((prevState) => ({
                ...prevState,
                name: myDecodedToken?.name,
                role_id: myDecodedToken?.role_id,
            }))
        }
    }, []);

    return (
        <div>
            <Header toggleHandler={toggleHandler} currentUser = {currentUser} />
            <SideBar toggle={toggle} />
            <div className='w-full md:w-[calc(100%-14rem)] ml-auto p-4'>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout
