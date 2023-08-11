import React, { useState } from 'react'
import UserLayout from '../../Layouts/UserLayout';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../Store/Api/CategorySlice';
import { Link } from '@inertiajs/react';


const Home = () => {
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

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 py-10'>
            {categories?.data?.map((item, i) => (
                <div className="card w-full p-4 bg-base-100 border border-base-100 shadow-md" key={i}>
                    <h1 className='text-2xl mb-3'>{item?.name}</h1>
                    <Link href={`/examinations?id=${item?.id}`} className='btn btn-primary btn-xs'>Start Exam</Link>
                </div>
            ))}

        </div>
    )
}
Home.layout = page => <UserLayout children={page} title="Home" />
export default Home
