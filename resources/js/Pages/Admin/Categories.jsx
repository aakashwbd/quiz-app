import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import CategoryForm from '../../Components/Admin/Form/CategoryForm';
import Table from '../../Components/UI/Table';
import AdminLayout from '../../Layouts/AdminLayout';
import { deleteCategory, fetchCategories, fetchCategory } from '../../Store/Api/CategorySlice';
import { deleteAlertMessage, responseAlert, tableIndex } from '../../Utils/helpers';

const Categories = () => {
    /** Paginate & fetch all data **/
    const [paginate, setPaginate] = useState({ page: 1, offset: 10 });

    const { isLoading: fetchCategoriesLoading, data: categories, refetch } = useQuery({
        queryKey: ['categories', paginate],
        queryFn: () => fetchCategories(paginate),
        select: (data) => data.data,
        refetchOnWindowFocus: false
    })

    const paginateHandler = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState, [field]: parseInt(value),
        }));
    };

    /** Delete a Single Item **/
    const removeSingleItem = useMutation(deleteCategory)
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
        queryKey: ['category', selectedId],
        queryFn: () => fetchCategory(selectedId),
        select: (data) => data.data,
        refetchOnWindowFocus: false,
        enabled: !!selectedId
    })
    const editHandler = (id) => {
        setDialog(true)
        setSelectedId(id)
    }

    const [headCells] = useState(["#", "Name", "Actions"]);
    const [dialog, setDialog] = useState(false)

    return (
        <>
            <Table
                title='Category List'
                controls={<button onClick={() => setDialog(true)} className='btn btn-primary btn-sm'>Add New</button>}
                headCells={headCells}
                isLoading={fetchCategoriesLoading}
                paginateCount={categories?.last_page}
                activePaginate={categories?.current_page}
                handleChange={paginateHandler}
                content={
                    categories?.data?.map((item, i) => (
                        <tr key={i}>
                            <th>{tableIndex(categories?.from, i)}</th>
                            <td>{item?.name}</td>
                            <td>
                                <button type='button' className='btn btn-sm btn-ghost' onClick={() => editHandler(item?.id)}>Edit</button>
                                <button type='button' className='btn btn-sm btn-ghost' onClick={() => deleteHandler(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            />
            <CategoryForm
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

Categories.layout = page => <AdminLayout children={page} title="Categories" />

export default Categories
