import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { CalibrateSensorForm, DeviceInfo, DeviceInput, EditDeviceInput } from '../Ultils/type'
import { AxiosHandleResponse } from '../Ultils/middleware'

const baseUrl = ' http://localhost:3003/api/device'
const config = {
    headers: { Authorization: `bearer ${Cookies.get('token')}` }, // notice the Bearer before your token
}



const getAllDevices = async (): Promise<DeviceInfo[] | undefined> => {
    try {
        const res = await axios.get(`${baseUrl}`,
            config
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const getDevice = async (deviceId: string): Promise<DeviceInfo | undefined> => {
    try {
        const res = await axios.get(`${baseUrl}/${deviceId}`,
            config
        )
        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const createDevice = async (newDevice: DeviceInput): Promise<DeviceInfo | undefined> => {
    try {
        const res = await axios.post(`${baseUrl}`, newDevice,
            config
        )
        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log(error)
            AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const getAvaibleDeviceByTime = async (): Promise<DeviceInfo[] | undefined> => {
    try {
        const res = await axios.get(`${baseUrl}/getAvaibleDevice`,
            config
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const editDevice = async (editDevice: EditDeviceInput): Promise<DeviceInfo | undefined> => {
    try {
        const res = await axios.put(`${baseUrl}/${editDevice.id}`,
            editDevice,
            config
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const calibrateSensor = async (deviceId: string ,input: CalibrateSensorForm) => {
    try {
        const res = await axios.post(`${baseUrl}/${deviceId}/calibrate`,
            input,
            config
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const readSensor = async (deviceId: string,sensorType : string) => {
    try {
        const res = await axios.get(`${baseUrl}/${deviceId}/${sensorType}`,
            config
        )

        return res.data
    }
    catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            AxiosHandleResponse(error)
        } else {
            console.log(error)

        }
    }
}

const deleteDevice = async (deviceId : string): Promise<void> => {
    try {
        await axios.delete(`${baseUrl}/${deviceId}`,
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

const deviceService = {
    getAllDevices,
    getDevice,
    createDevice,
    getAvaibleDeviceByTime,
    editDevice,
    calibrateSensor,
    readSensor,
    deleteDevice
}

export default deviceService