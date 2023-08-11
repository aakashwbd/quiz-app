import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import QuestionForm from '../../Components/Admin/Form/QuestionForm';
import Table from '../../Components/UI/Table';
import AdminLayout from '../../Layouts/AdminLayout';
import { deleteQuestion, fetchQuestion, fetchQuestions } from '../../Store/Api/QuestionSlice';
import { deleteAlertMessage, responseAlert, tableIndex } from '../../Utils/helpers';

const Questions = () => {
    /** Paginate & fetch all data **/
    const [paginate, setPaginate] = useState({ page: 1, offset: 10 });

    const { isLoading: fetchQuestionsLoading, data: questions, refetch } = useQuery({
        queryKey: ['questions', paginate],
        queryFn: () => fetchQuestions(paginate),
        select: (data) => data.data,
        refetchOnWindowFocus: false
    })

    const paginateHandler = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState, [field]: parseInt(value),
        }));
    };

    /** Delete a Single Item **/
    const removeSingleItem = useMutation(deleteQuestion)
    const deleteHandler = (id) => {
        deleteAlertMessage(async () => {
            let data = await removeSingleItem.mutateAsync(id)
            refetch()
            responseAlert(data.message, data.status)
        })
    }

    /** Edit a Single Item **/
    const [selectedId, setSelectedId] = useState(null)
    const { data: payload, isLoading: payloadLoading, } = useQuery({
        queryKey: ['question', selectedId],
        queryFn: () => fetchQuestion(selectedId),
        select: (data) => data.data,
        refetchOnWindowFocus: false,
        enabled: !!selectedId
    })
    const editHandler = (id) => {
        setDialog(true)
        setSelectedId(id)
    }

    const [headCells] = useState(["#", "Question", "Options", "Category", "Actions"]);
    const [dialog, setDialog] = useState(false)

    return (
        <>
            <Table
                title='Quesiton List'
                controls={<button onClick={() => setDialog(true)} className='btn btn-primary btn-sm'>Add New</button>}
                headCells={headCells}
                isLoading={fetchQuestionsLoading}
                paginateCount={questions?.last_page}
                activePaginate={questions?.current_page}
                handleChange={paginateHandler}
                content={
                    questions?.data?.map((item, i) => (
                        <tr key={i}>
                            <th>{tableIndex(questions?.from, i)}</th>
                            <td>{item?.question}</td>
                            <td>
                                <ul>
                                    {item?.options?.map((qItem, i) => (
                                        <li key={i}>{qItem}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>{item?.category?.name}</td>
                            <td>
                                <button type='button' className='btn btn-sm btn-ghost' onClick={() => editHandler(item?.id)}>Edit</button>
                                <button type='button' className='btn btn-sm btn-ghost' onClick={() => deleteHandler(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            />
            <QuestionForm
                dialog={dialog}
                setDialog={setDialog}
                fetch={refetch}
                payload={payload}
                payloadLoading={payloadLoading}
                resetPayload={() => setSelectedId(null)}
            />
        </>
    )
}
Questions.layout = page => <AdminLayout children={page} title="Questions" />

export default Questions
