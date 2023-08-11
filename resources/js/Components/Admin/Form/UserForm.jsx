import { useMutation } from '@tanstack/react-query'
import Validator from 'Validator'
import React, { useEffect, useState } from 'react'
import { storeCategory, updateCategory } from '../../../Store/Api/CategorySlice'
import { responseAlert, validateErrorGenerator } from '../../../Utils/helpers'
import Modal from '../../UI/Modal'
import TextField from '../../UI/TextField'
import { storeUser, updateUser } from '../../../Store/Api/UserSlice'
import SelectBox from '../../UI/SelectBox'

const UserForm = ({ dialog = false, setDialog, fetch = () => { }, payload = {}, resetPayload = () => { }, payloadLoading = false }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role_id: "",
        status: "active",
    })

    const [errors, setErrors] = useState({
        name: { text: "", show: false },
        email: { text: "", show: false },
        password: { text: "", show: false },
        role_id: { text: "", show: false },
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

    const create = useMutation(storeUser)
    const update = useMutation(updateUser)

    const callbackHandler = (data = null) => {
        if (data.status === 'validate_error') {
            validateErrorGenerator(data.data, setErrors)
        } else {
            if (data.status === 'server_error' || data.status === 'error') {
                responseAlert(data.message, 'error')
            } else {
                setDialog(false)
                fetch()
                responseAlert(data.message, 'success')
            }
        }
    }

    const rules = {
        name: "required",
        email: "required|email",
        password: "sometimes",
        role_id: "required",
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        let validation = await Validator.make(form, rules)
        if (validation.fails()) {
            const errors = validation.getErrors();
            validateErrorGenerator(errors, setErrors)
        } else {
            let data = ""
            if (!form.hasOwnProperty('id')) {
                data = await create.mutateAsync(form)
            } else {
                data = await update.mutateAsync(form)
            }
            callbackHandler(data)
        }
    }

    useEffect(() => {
        if (payload && Object.keys(payload).length > 0) {
            setForm((prevState) => ({
                ...prevState,
                ...payload
            }))
        }
    }, [payload]);

    useEffect(() => {
        return () => { resetPayload() }
    }, []);

    return (
        <Modal open={dialog} onHide={() => setDialog(false)} title={'Add category'}>
            <form onSubmit={submitHandler}>
                <div className='px-4 py-2'>
                    <SelectBox
                        title='Role'
                        value={form.role_id}
                        onChange={(e) => {
                            fieldChangeHandler("role_id", e.target.value);
                        }}
                        options={[{ name: 'Admin', id: 1 }, { name: 'User', id: 2 }]}
                        key={'id'}
                        optionKey='name'
                        optionValue='id'
                    />
                    <TextField
                        title='Name'
                        value={form.name}
                        onChange={(e) => {
                            fieldChangeHandler('name', e.target.value)
                        }}
                        error={errors.name.show}
                        helperText={errors.name.text}
                    />
                    <TextField
                        title='Email'
                        value={form.email}
                        onChange={(e) => {
                            fieldChangeHandler('email', e.target.value)
                        }}
                        error={errors.email.show}
                        helperText={errors.email.text}
                    />
                    {!form.id && (
                        <TextField
                            title='Password'
                            value={form.password}
                            onChange={(e) => {
                                fieldChangeHandler('password', e.target.value)
                            }}
                            error={errors.password.show}
                            helperText={errors.password.text}
                        />
                    )}

                </div>
                <div className='modal-action px-4 py-2 border-t'>
                    <button type='submit' className='btn btn-primary btn-sm'>Save</button>
                    <button type='button' className='btn btn-ghost btn-sm' onClick={() => setDialog(false)}>Cancel</button>
                </div>
            </form>
        </Modal>
    )
}

export default UserForm
