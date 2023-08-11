import React, { useEffect, useState } from 'react'
import UserLayout from '../../Layouts/UserLayout'
import TextField from '../../Components/UI/TextField'
import Cookies from "js-cookie"
import { tokenDecoder } from '../../Utils/helpers'
import { useMutation } from '@tanstack/react-query'
import { updateProfile, updateUser } from '../../Store/Api/UserSlice'

const Profile = () => {

    const [form, setForm] = useState({
        id: "",
        name: ""
    });

    const [errors, setErrors] = useState({
        name: { text: "", show: false }
    })

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

    const update = useMutation(updateProfile)
    const submitHandler = async (e) => {
        e.preventDefault();

        let data = await update.mutateAsync(form)

        if (data.status === "success") {
            Cookies.set('authToken', JSON.stringify(data.data), { expires: 1 })
            window.location.reload();
        }
    }

    useEffect(() => {
        let token = Cookies.get('authToken') || null
        if (token) {
            let { myDecodedToken } = tokenDecoder(JSON.parse(token))
            if (myDecodedToken) {
                setForm((prevState) => ({
                    ...prevState,
                    id: myDecodedToken?.id,
                    name: myDecodedToken?.name,
                }))
            }
        }
    }, []);

    return (
        <form className="card bg-base-100 border w-full max-w-2xl shadow-md p-4" onSubmit={submitHandler}>
            <h1 className="border-b pb-2">Update Profile</h1>
            <div className="grid grid-cols-1 gap-4">
                <TextField
                    title='Name'
                    value={form.name}
                    onChange={(e) => {
                        fieldChangeHandler('name', e.target.value)
                    }}
                    error={errors.name.show}
                    helperText={errors.name.text}
                />

                <div>
                    <button type='submit' className='btn btn-primary btn-sm'>Update</button>
                </div>
            </div>
        </form>
    )
}
Profile.layout = page => <UserLayout children={page} title="Profile" />
export default Profile
