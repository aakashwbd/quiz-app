import React, { useState } from 'react'
import AuthLayout from '../../Layouts/AuthLayout'
import TextField from '../../Components/UI/TextField'
import { Link } from '@inertiajs/react'
import { AuthUrls } from '../../Constants/siteUrls'
import { responseAlert, validateErrorGenerator } from '../../Utils/helpers'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../Store/Api/LoginSlice'
import Cookies from 'js-cookie'
import Validator from 'Validator'

const Login = () => {
    const [form, setForm] = useState({
        name: "",
        email: ""
    })

    const [errors, setErrors] = useState({
        email: { text: "", show: false },
        password: { text: "", show: false },
    })

    const resetHandler = () => {
        setErrors({
            email: { text: "", show: false },
            password: { text: "", show: false },
        })
        setForm({
            name: "",
            email: ""
        })
    }

    const fieldChangeHandler = (field, value) => {
        setErrors((prevState) => ({
            ...prevState,
            [field]: { text: "", show: false }
        }))
        setForm((prevState) => ({
            ...prevState,
            [field]: value
        }))
    }

    const loginMutate = useMutation(login)
    const callbackHandler = (data = null) => {
        if (data.status === 'validate_error') {
            validateErrorGenerator(data.data, setErrors)
        } else {
            if (data.status === 'server_error' || data.status === 'error') {
                responseAlert(data.message, 'error')
            } else {
                resetHandler()
                responseAlert(data.message, 'success')
                console.log('s', data.data)

                if (data.data.token) {
                    Cookies.set('authToken', JSON.stringify(data.data.token), {expires: 1})
                    if(data?.data?.role_id !== 1){
                        window.location.replace('/');
                    }else{
                        window.location.replace('/dashboard');
                    }
                }
            }
        }
    }

    const rules = {
        email: "required|email",
        password: "required|min:6",
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        let validation = await Validator.make(form, rules)

        if (validation.fails()) {
            const errors = validation.getErrors();
            validateErrorGenerator(errors, setErrors)
        } else {
            let data = await loginMutate.mutateAsync(form)
            callbackHandler(data)
        }
    }
    return (
        <div>
            <h1 className='text-center text-xl mb-2'>Login</h1>
            <form onSubmit={submitHandler}>
                <TextField
                    title="Email"
                    isRequired={true}
                    value={form.email}
                    onChange={(e) => fieldChangeHandler("email", e.target.value)}
                    error={errors.email.show}
                    helperText={errors.email.text}
                />
                <TextField
                    title="Password"
                    isRequired={true}
                    secret={true}
                    value={form.password}
                    onChange={(e) => fieldChangeHandler("password", e.target.value)}
                    error={errors.password.show}
                    helperText={errors.password.text}
                />
                <div className='flex items-center justify-between gap-4 mt-6'>
                    <button type='submit' className='btn btn-primary btn-sm'>Login</button>
                    <p className='text-sm'>
                        Don't have an account? Please  <Link href={AuthUrls.REGISTER} className='link link-primary'>Register</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

Login.layout = page => <AuthLayout children={page} title="Login" />
export default Login
