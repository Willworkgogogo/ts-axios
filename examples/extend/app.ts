import axios from '../../src'

interface ResponseData<T = any> {
    code: number,
    message: string,
    result: T
}

interface User {
    name: string,
    age: number
}

function getUser<T>() {
    return axios<ResponseData<T>>('/extend/user')
        .then(res => res.data)
}

async function test() {
    const user = await getUser<User>()
    if (user) {
        //! 为什么ts没有推倒出来user的类型
        console.log(user.result.name)
    }
}

test()