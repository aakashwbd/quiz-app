import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { fetchSummary } from '../../Store/Api/summarySlice';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
    const { data } = useQuery({
        queryKey: ['summaries'],
        queryFn: () => fetchSummary(),
        select: (data) => data.data,
        refetchOnWindowFocus: false
    })

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='card w-full bg-base-100 border border-base-200 shadow-md p-4'>
                <h6>{data?.users}</h6>
                <p>Total user</p>
            </div>
            <div className='card w-full bg-base-100 border border-base-200 shadow-md p-4'>
                <h6>{data?.categories}</h6>
                <p>Total category</p>
            </div>
            <div className='card w-full bg-base-100 border border-base-200 shadow-md p-4'>
                <h6>{data?.questions}</h6>
                <p>Total question</p>
            </div>
        </div>
    )
}
Dashboard.layout = page => <AdminLayout children={page} title="Dashboard" />

export default Dashboard
