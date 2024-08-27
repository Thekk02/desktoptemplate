import {request} from "axios";

//身份验证
export const login = (data) => {
    return request.post('/user/login',data)
}