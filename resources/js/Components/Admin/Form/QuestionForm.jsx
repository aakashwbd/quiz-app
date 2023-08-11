import { useMutation, useQuery } from '@tanstack/react-query'
import Validator from 'Validator'
import React, { useEffect, useState } from 'react'
import { storeQuestion, updateQuestion } from '../../../Store/Api/QuestionSlice'
import { responseAlert, validateErrorGenerator } from '../../../Utils/helpers'
import Modal from '../../UI/Modal'
import TextField from '../../UI/TextField'
import { fetchCategories } from '../../../Store/Api/CategorySlice'
import SelectBox from '../../UI/SelectBox'

const QuestionForm = ({ dialog = false, setDialog, fetch = () => { }, payload = {}, resetPayload = () => { }, payloadLoading = false }) => {

    const [paginate] = useState({ page: 1, offset: 500 });
    const { data: category } = useQuery({
        queryKey: ['category', paginate],
        queryFn: () => fetchCategories(paginate),
        select: (data) => data.data,
        refetchOnWindowFocus: false
    })


    const [form, setForm] = useState({
        category_id: "",
        question: "",
        options: ["", ""],
        answer: ""
    })

    const [errors, setErrors] = useState({
        category_id: { text: "", show: false },
        question: { text: "", show: false },
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

    const addHandler = () => {
        setForm(prevState => ({
            ...prevState,
            options: [...prevState.options, ""]
        }))
    }


    const deleteHandler = (index) => {
        let options = [...form.options];
        options = options.filter((item, i) => i !== index);

        setForm((prevState) => ({
            ...prevState,
            options: options,
        }));
    };

    const optionChangeHandler = (index, value) => {
        let options = [...form.options];
        options[index] = value;

        setForm((prevState) => ({
            ...prevState,
            options: options,
            answer: ""
        }));
    };

    const create = useMutation(storeQuestion)
    const update = useMutation(updateQuestion)

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
        question: "required",
        category_id: "required",
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
        <Modal open={dialog} onHide={() => setDialog(false)} title={'Add Question'}>
            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-1 gap-4 px-4 py-2">
                    <TextField
                        title="Question"
                        isRequired={true}
                        value={form.question}
                        onChange={(e) => fieldChangeHandler("question", e.target.value)}
                        error={errors.question.show}
                        helperText={errors.question.text}
                    />

                    <div className="w-full">
                        <SelectBox
                            title='Select category'
                            value={form.category_id}
                            onChange={(e) => {
                                fieldChangeHandler("category_id", e.target.value);
                            }}
                            options={category?.data}
                            key={'id'}
                            optionKey='name'
                            optionValue='id'
                        />
                    </div>
                    <div>
                        <label className='label'>Options</label>
                        {form.options.map((item, i) => (
                            <div className='flex items-center gap-4 w-full mb-2' key={i}>
                                <div className="w-full">
                                    <TextField
                                        value={item}
                                        onChange={(e) => {
                                            optionChangeHandler(i, e.target.value);
                                        }}
                                    />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input
                                        disabled={item.length === 0}
                                        type="radio"
                                        checked={item.length > 0 && form.answer === item}
                                        onChange={(e) => fieldChangeHandler("answer", item)}
                                        className='radio radio-primary radio-xs'
                                    />
                                    {((form.options.length - 1) === i) ? (
                                        <button type='button' className='btn btn-circle btn-sm text-lg btn-ghost' onClick={addHandler}>+</button>
                                    ) : (
                                        <button type='button' className='btn btn-circle btn-sm text-lg btn-ghost' onClick={() => deleteHandler(i)}>-</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='modal-action px-4 py-2 border-t'>
                    <button type='submit' className='btn btn-primary btn-sm'>Save</button>
                    <button type='button' className='btn btn-ghost btn-sm' onClick={() => setDialog(false)}>Cancel</button>
                </div>
            </form>
        </Modal>
    )
}

export default QuestionForm
