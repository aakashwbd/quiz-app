import React, {useState} from 'react'
import AuthLayout from '../../Layouts/AuthLayout'
import TextField from '../../Components/UI/TextField'
import { Link } from '@inertiajs/react'
import { register } from '../../Store/Api/RegisterSlice'
import { useMutation } from '@tanstack/react-query'
import Validator from 'Validator'
import { responseAlert, validateErrorGenerator } from '../../Utils/helpers'
import { AuthUrls } from '../../Constants/siteUrls'

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role_id: "2",
        status: 'active'
    })

    const [errors, setErrors] = useState({
        name: { text: "", show: false },
        email: { text: "", show: false },
        password: { text: "", show: false },
        password_confirmation: { text: "", show: false },
    })

    const resetHandler = () => {
        setErrors({
            name: { text: "", show: false },
            email: { text: "", show: false },
            password: { text: "", show: false },
            password_confirmation: { text: "", show: false },
        })
        setForm({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            role_id: "2",
            status: 'active'
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

    const registerMutate = useMutation(register)
    const callbackHandler = (data = null) => {
        if (data.status === 'validate_error') {
            validateErrorGenerator(data.data, setErrors)
        } else {
            if (data.status === 'server_error' || data.status === 'error') {
                responseAlert(data.message, 'error')
            } else {
                resetHandler()
                responseAlert(data.message, 'success')
            }
        }
    }

    const rules = {
        name: "required",
        email: "required|email",
        password: "required|min:6|confirmed",
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        let validation = await Validator.make(form, rules)

        if (validation.fails()) {
            const errors = validation.getErrors();
            validateErrorGenerator(errors, setErrors)
        } else {
            let data = await registerMutate.mutateAsync(form)
            callbackHandler(data)
        }
    }

    return (
        <div>
            <h1 className='text-center text-xl mb-2'>Sign Up</h1>
            <form onSubmit={submitHandler}>
                <TextField
                    title="Name"
                    isRequired={true}
                    value={form.name}
                    onChange={(e) => fieldChangeHandler("name", e.target.value)}
                    error={errors.name.show}
                    helperText={errors.name.text}
                />
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
                <TextField
                    title="Confirm Password"
                    isRequired={true}
                    secret={true}
                    value={form.password_confirmation}
                    onChange={(e) => fieldChangeHandler("password_confirmation", e.target.value)}
                    error={errors.password_confirmation.show}
                    helperText={errors.password_confirmation.text}
                />

                <div className='flex items-center justify-between gap-4 mt-6'>
                    <button type='submit' className='btn btn-primary btn-sm'>Register</button>
                    <p className='text-sm'>
                        Already have an account? Please  <Link href={AuthUrls.LOGIN} className='link link-primary'>Login</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

Register.layout = page => <AuthLayout children={page} title="Login" />
export default Register
