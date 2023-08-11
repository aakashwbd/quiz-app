import Swal from "sweetalert2"
import {decodeToken, isExpired} from "react-jwt";

export const tableIndex = (from, index) => {
    return from + index
}

export const validateErrorGenerator = (data, setter) => {
    let validate = {}
    Object.keys(data).forEach((key) => {
        if(Array.isArray(data[key])){
            validate[key] = {text: data[key][0], show: true}
        }else{
            validate[key] = {text: data[key], show: true}
        }
    })
    setter((prevState) => ({
        ...prevState,
        ...validate
    }))
}

export const deleteAlertMessage = (cb=()=>{}) => {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to continue?",
        icon: "question",
        confirmButtonText: "Yes, Delete it",
        showCancelButton: true,
        focusCancel: true,
    }).then((result) => {
        if (result.isConfirmed) {
            cb()
        }
    })
}

export const responseAlert = (message ="", status="success", cb=()=>{}) => {
    Swal.fire({
        title: message,
        icon: status,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Okay'
    }).then((result) => {
        if (result.isConfirmed) {
            cb()
        }
    })
}




export const tokenDecoder = (token) => {
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);

    return {myDecodedToken, isMyTokenExpired};
};
