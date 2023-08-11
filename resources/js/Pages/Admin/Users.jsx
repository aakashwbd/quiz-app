import React, { useState, useEffect } from 'react'
import AdminLayout from '../../Layouts/AdminLayout'
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteUser, fetchUser, fetchUsers } from '../../Store/Api/UserSlice';
import { deleteAlertMessage, responseAlert, tableIndex } from '../../Utils/helpers';
import UserForm from '../../Components/Admin/Form/UserForm';
import Table from '../../Components/UI/Table';

const Users = () => {
    /** Paginate & fetch all data **/
    const [paginate, setPaginate] = useState({ page: 1, offset: 10 });

    const { isLoading: fetchAllUserLoading, data: users, refetch } = useQuery({
        queryKey: ['users', paginate],
        queryFn: () => fetchUsers(paginate),
        select: (data) => data.data,
        refetchOnWindowFocus: false
    })

    const paginateHandler = (field, value) => {
        setPaginate((prevState) => ({
            ...prevState, [field]: parseInt(value),
        }));
    };

    /** Delete a Single Item **/
    const removeSingleItem = useMutation(deleteUser)
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
        queryKey: ['user', selectedId],
        queryFn: () => fetchUser(selectedId),
        select: (data) => data.data,
        refetchOnWindowFocus: false,
        enabled: !!selectedId
    })
    const editHandler = (id) => {
        setDialog(true)
        setSelectedId(id)
    }

    const [headCells] = useState(["#", "Name", "email", "Actions"]);
    const [dialog, setDialog] = useState(false)
    return (
        <div>
            <Table
                title='User List'
                controls={<button onClick={() => setDialog(true)} className='btn btn-primary btn-sm'>Add New</button>}
                headCells={headCells}
                isLoading={fetchAllUserLoading}
                paginateCount={users?.last_page}
                activePaginate={users?.current_page}
                handleChange={paginateHandler}
                content={
                    users?.data?.map((item, i) => (
                        <tr key={i}>
                            <th>{tableIndex(users?.from, i)}</th>
                            <td>{item?.name}</td>
                            <td>{item?.email}</td>
                            <td>
                                <div className="badge badge-primary">
                                    {item?.role_id !== 1 ? 'User' : 'Admin'}
                                </div>
                            </td>
                            <td>
                                <button type='button' className='btn btn-sm btn-ghost' onClick={() => editHandler(item?.id)}>Edit</button>
                                <button type='button' className='btn btn-sm btn-ghost' onClick={() => deleteHandler(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            />
            <UserForm
                dialog={dialog}
                setDialog={setDialog}
                fetch={refetch}
                payload={payload}
                payloadLoading={payloadLoading}
                resetPayload={() => setSelectedId(null)}
            />
        </div>
    )
}

Users.layout = page => <AdminLayout children={page} title="Users" />
export default Users
