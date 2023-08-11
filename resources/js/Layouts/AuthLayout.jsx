import React, {useEffect} from 'react'
import { tokenDecoder } from '../Utils/helpers';
import Cookies from 'js-cookie'

const AuthLayout = ({ children }) => {
    useEffect(() => {
        let token = Cookies.get('authToken') || null
        if(token){
            let {myDecodedToken, isMyTokenExpired} = tokenDecoder(JSON.parse(token))

            if (!isMyTokenExpired) {
                if(myDecodedToken?.role_id !== 1){
                    window.location.replace('/')
                }else{
                    window.location.replace('/dashboard')
                }
            }
        }
    }, []);
    return (
        <div className="w-full h-full min-h-screen flex items-center justify-center p-4 ">
            <div className="card bg-base-100 shadow-md border border-base-200 p-4 w-full md:max-w-xl">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout
