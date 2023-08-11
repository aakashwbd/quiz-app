import React, { useState, useEffect } from 'react'
import UserLayout from '../../Layouts/UserLayout'
import { fetchQuestionByCategoryid } from '../../Store/Api/QuestionSlice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchResults, storeExamination } from '../../Store/Api/ExaminationSlice';
import { responseAlert, tokenDecoder } from '../../Utils/helpers';
import Cookies from 'js-cookie'

const Examination = () => {
    const category_id = new URLSearchParams(window.location.search).get('id');
    const exam_id = new URLSearchParams(window.location.search).get('exam_id');

    const { isLoading:categoryIsLoading, data:questions } = useQuery({
        queryKey: ['categories', category_id],
        queryFn: () => fetchQuestionByCategoryid(category_id),
        select: (data) => data.data,
        refetchOnWindowFocus: false,
        enabled: !!category_id
    })

    const [resultData, setResultData] = useState({
        exam_id: null,
        user_id: null
    })
    const { isLoading:resultLoading, data: results } = useQuery({
        queryKey: ['results', resultData],
        queryFn: () => fetchResults(resultData),
        select: (data) => data.data,
        refetchOnWindowFocus: false,
        enabled: !!resultData?.exam_id
    })

    const [form, setForm] = useState({
        user_id: "",
        data: []
    })

    const fieldChangeHandler = (id, value) => {
        let getData = {
            id: id,
            answer: value
        }
        setForm(prevState => ({
            ...prevState,
            data: [...prevState.data, getData]
        }));
    }

    const examMutate = useMutation(storeExamination)
    const callbackHandler = (data = null) => {
        if (data.status === 'validate_error') {
            validateErrorGenerator(data.data, setErrors)
        } else {
            if (data.status === 'server_error' || data.status === 'error') {
                responseAlert(data.message, 'error')
            } else {
                responseAlert( `Your score is ${data?.data?.result?.right}` , 'success', () => {
                    window.location.replace(`/examinations?exam_id=${data?.data?.exam_id}`);
                })
            }
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        let data = await examMutate.mutateAsync(form)
        callbackHandler(data)
    }

    useEffect(() => {
        let token = Cookies.get('authToken') || null
        if (token) {
            let { myDecodedToken, isMyTokenExpired } = tokenDecoder(JSON.parse(token))

            setForm(prevState => ({
                ...prevState,
                user_id: myDecodedToken?.id
            }))

            setResultData(prevState => ({
                ...prevState,
                exam_id: exam_id,
                user_id: myDecodedToken?.id
            }))

        }
    }, []);



    return (
        <form className="grid grid-col-1 gap-6" onSubmit={submitHandler}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {questions?.map((qItem, q) => (
                <div key={q}>
                    {qItem?.question && (
                        <h1 className="mb-2 text-2xl text-semibold">
                            <span>Qustion No: {q + 1}</span>
                            {"  "}
                            <span>{qItem?.question}</span>
                        </h1>
                    )}

                    {qItem && qItem?.options?.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {qItem?.options?.map((oItem, o) => (
                                <div className="form-control inline-flex" key={o}>
                                    <label className="label inline-flex justify-start gap-4 cursor-pointer">
                                        <input
                                            type="radio"
                                            name={`option${q}`}
                                            className="radio radio-primary"

                                            onChange={() => fieldChangeHandler(qItem?.id, oItem)}
                                        />
                                        <span className="label-text">{oItem}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>

        <div>
            <button type='submit' className='btn btn-primary'>Submit</button>
        </div>
    </form>
    )
}

Examination.layout = page => <UserLayout children={page} title="Examination" />
export default Examination
