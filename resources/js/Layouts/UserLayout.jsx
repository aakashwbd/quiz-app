import React, {useEffect, useState} from 'react'
import Header from '../Components/User/Header'
import { tokenDecoder } from '../Utils/helpers';

import Cookies from 'js-cookie'

const UserLayout = ({ children }) => {

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
        if(myDecodedToken){
            setCurrentUser((prevState) => ({
                ...prevState,
                name: myDecodedToken?.name,
                role_id: myDecodedToken?.role_id,
            }))
        }
    }, []);

    return (
        <div>
            <Header currentUser={currentUser} />
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}

export default UserLayout
