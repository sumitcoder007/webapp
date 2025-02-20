import { toast } from "react-toastify";

export const successHandler = (msg) =>{
    toast.success(msg, {
        position: "top-right",
    })
}

export const errorHandler = (msg) =>{
    toast.error(msg, {
        position: "top-right",
    })
}