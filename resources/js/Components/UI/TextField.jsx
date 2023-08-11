import React, {useState} from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

const TextField = ({
    type = 'text',
    title = "",
    isRequired = false,
    secret = false,
    value,
    onChange = () => { },
    error = false,
    helperText = "",
    props
}) => {
    const [textType, setTextType] = useState(secret ? 'password' : type)

    const textViewHandler = () => {
        if (secret) {
            if (textType === 'password') {
                setTextType('text');
            } else {
                setTextType('password');
            }
        }
    }

    return (
        <div>
            {title && (
                <label className='label'>{title} {isRequired && '*'}</label>
            )}
            <div className='join w-full'>
                <input type={textType} value={value} onChange={onChange} className={`input input-bordered block input-sm w-full ${secret && 'join-item'}  ${error && 'input-error'}`} {...props} />
                {secret && <button type='button' onClick={textViewHandler} className='btn btn-primary btn-sm join-item'>
                    {textType === 'password' ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                </button>}
            </div>
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{helperText}</span>
                </label>
            )}
        </div>
    )
}

export default TextField
