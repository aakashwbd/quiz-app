import React from 'react'

const Modal = ({open = false, onHide= () => {}, title = '', children}) => {
    return (
        <dialog open={open} className="modal bg-[rgba(0,0,0,0.5)]">
            <div className="modal-box p-0 rounded-md">
                <div className='px-4 py-2 flex items-center justify-between gap-4 shadow-md'>
                    <h3 className="text-lg">{title}</h3>
                    <button type='button' onClick={onHide} className='btn btn-sm btn-circle btn-ghost'>x</button>
                </div>
                {children}
                {/* <div className='px-4 py-2'></div>
                <div className='modal-action px-4 py-2 border-t'>
                    <button type='submit' className='btn btn-primary btn-sm'>Save</button>
                    <button type='button' className='btn btn-ghost btn-sm' onClick={close}>Cancel</button>
                </div> */}
            </div>
        </dialog>
    )
}

export default Modal
