import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { EditTaskInput, TaskInfo, TaskInput } from '../Ultils/type'
import { AxiosHandleResponse } from '../Ultils/middleware'


const baseUrl = ' http://localhost:3003/api/task'
const config = {
    headers: { Authorization: `bearer ${Cookies.get('token')}` }, // notice the Bearer before your token
}



const getAllTasks = async (): Promise<TaskInfo[] | undefined> => {
    try {
        const res = await axios.get(`${baseUrl}`,
            config
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const getTask = async (deviceId: string): Promise<TaskInfo | undefined> => {
    try {
        const res = await axios.get(`${baseUrl}/${deviceId}`,
            config
        )
        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const createTask = async (newTask: TaskInput): Promise<TaskInfo | undefined> => {
    try {
        const res = await axios.post(`${baseUrl}`, newTask,
            config
        )
        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const updateTask = async (task: EditTaskInput): Promise<TaskInfo | undefined> => {
    const { id, ...detail } = task
    try {
        const res = await axios.put(`${baseUrl}/${id}`, detail,
            config
        )
        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const completeTask = async (taskId: number) => {
    try {
        const res = await axios.put(`${baseUrl}/complete/${taskId}`, {},
            config
        )
        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const pauseTask = async (taskId: number) => {
    try {
        const res = await axios.put(`${baseUrl}/pause/${taskId}`, {},
            config
        )
        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const resumeTask = async (taskId: number) => {
    try {
        const res = await axios.put(`${baseUrl}/resume/${taskId}`, {},
            config
        )
        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const assignTask = async (taskId: number, deviceId: string) => {
    try {
        const detail =
        {
            taskId,
            deviceId
        }

        const response = await axios.post(`${baseUrl}/assignSensor`, detail, config)
        return response.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            throw AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const unassignTask = async (taskId: number, deviceId: string) => {
    try {
        const detail =
        {
            taskId,
            deviceId
        }
        const response = await axios.post(`${baseUrl}/unassignSensor`, detail, config)
        return response.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log(error)
        } else {
            console.log(error)

        }
    }
} 

const deleteTask = async (taskId : number): Promise<void> => {
    try {
        await axios.delete(`${baseUrl}/${taskId}`,
            config
        )
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const taskService = {
    getAllTasks,
    getTask,
    createTask,
    assignTask,
    completeTask,
    pauseTask,
    resumeTask,
    updateTask,
    deleteTask,
    unassignTask
}

export default taskService