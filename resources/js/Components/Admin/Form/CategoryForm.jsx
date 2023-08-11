import { useMutation } from '@tanstack/react-query'
import Validator from 'Validator'
import React, { useEffect, useState } from 'react'
import { storeCategory, updateCategory } from '../../../Store/Api/CategorySlice'
import { responseAlert, validateErrorGenerator } from '../../../Utils/helpers'
import Modal from '../../UI/Modal'
import TextField from '../../UI/TextField'

const CategoryForm = ({ dialog = false, setDialog, fetch = () => { }, payload = {}, resetPayload = () => { }, payloadLoading = false }) => {
    const [form, setForm] = useState({
        name: "",
    })

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

    const create = useMutation(storeCategory)
    const update = useMutation(updateCategory)

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
                    <TextField
                        title='Category Name'
                        value={form.name}
                        onChange={(e) => {
                            fieldChangeHandler('name', e.target.value)
                        }}
                        error={errors.name.show}
                        helperText={errors.name.text}
                    />
                </div>
                <div className='modal-action px-4 py-2 border-t'>
                    <button type='submit' className='btn btn-primary btn-sm'>Save</button>
                    <button type='button' className='btn btn-ghost btn-sm' onClick={() => setDialog(false)}>Cancel</button>
                </div>
            </form>
        </Modal>
    )
}

export default CategoryForm
