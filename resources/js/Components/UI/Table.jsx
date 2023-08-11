import React from 'react'

const Table = ({
    title = "Table Name",
    controls,
    headCells = [],
    isLoading = false,
    paginateCount = 0,
    activePaginate = 0,
    handleChange = () => {} ,
    content
}) => {
    return (
        <div>
            <div className="card bg-base-100 shadow-md p-4 rounded-md">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <h1 className='text-base font-medium'>{title}</h1>
                    {controls}
                </div>

                {isLoading ? (
                    <div className='animate-pulse'>
                        <div className='h-10 w-full rounded-md bg-gray-300 mb-4'></div>
                        <div className='h-12 w-full rounded-md bg-gray-300 mb-4'></div>
                        <div className='h-12 w-full rounded-md bg-gray-300 mb-4'></div>
                        <div className='h-12 w-full rounded-md bg-gray-300 mb-4'></div>
                        <div className='h-12 w-full rounded-md bg-gray-300 mb-4'></div>
                        <div className='h-12 w-full rounded-md bg-gray-300 mb-4'></div>
                        <div className='h-12 w-full rounded-md bg-gray-300 mb-4'></div>
                        <div className='h-12 w-full rounded-md bg-gray-300 mb-4'></div>
                        <div className='h-12 w-full rounded-md bg-gray-300 mb-4'></div>
                        <div className='h-12 w-full rounded-md bg-gray-300 mb-4'></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto mb-2">
                        <table className="table">
                            <thead>
                                <tr>
                                    {headCells?.length > 0 && headCells?.map((item, i) => (
                                        typeof item === 'string' ? (<th key={i}>{item}</th>) :
                                            (<th align={item.align ? item.align : "left"} key={i}>{item?.field}</th>)
                                    ))}
                                </tr>
                            </thead>
                            <tbody>{content}</tbody>
                        </table>
                    </div>
                )}
                <div className="join">
                    {[...Array(paginateCount)].map((_item, i) => (
                        <button className={`join-item btn btn-sm ${activePaginate === (i+1) && 'btn-active'}`} value={i + 1} key={i} onClick={(e) => handleChange('page', e.target.value)}>{i + 1}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Table
