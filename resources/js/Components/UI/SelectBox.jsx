import React from 'react'

const SelectBox = ({
    title = "",
    value,
    onChange = () => { },
    error = false,
    helperText = "",
    optionKey = "",
    optionValue="",
    options,
    isRequired=false,
    props
}) => {
    return (
        <div>
            {title && (
                <label className='label'>{title} {isRequired && '*'}</label>
            )}
            <select
                className={`select select-bordered block w-full ${error && 'select-error'}`}
                value={value}
                onChange={onChange}
                {...props}
            >
                <option value="">Select</option>
                {options?.map((item, i) => (
                    <option key={i} value={item[optionValue]}>{item[optionKey]}</option>
                ))}
            </select>
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{helperText}</span>
                </label>
            )}
        </div>
    )
}

export default SelectBox
