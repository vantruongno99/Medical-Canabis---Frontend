export type LoginDetail = {
    username: string;
    password: string
}

export type DeviceInput = {
    name: string,
    id: string,
}

export interface DeviceInfo extends DeviceInput {
    CH4_SN: string | null
    O2_SN: string | null
    CO2_SN: string | null
    PUMP_SN: string | null
    updateUTC: string,
    Task: { Task: TaskInfo }[]
}

export interface DeviceForm extends DeviceInput {
    CH4_SN: string | null
    O2_SN: string | null
    CO2_SN: string | null
    PUMP_SN: string | null
    updateUTC: string,
} 


export interface EditDeviceInput extends DeviceInput {
    CH4_SN: string | null
    O2_SN: string | null
    CO2_SN: string | null
    PUMP_SN: string | null
}

export interface EditTaskInput  {
    id: number,
    endTime: Date,
    name: string,
    logPeriod: number
}

export type TaskInput = {
    startTime: Date,
    endTime: Date,
    name: string,
    logPeriod: number

}

export interface TaskInfo extends TaskInput {
    id: number,
    createdUTC: Date,
    completedUTC: Date | null,
    createUser: string,
    completeUser: string | null,
    status: string
    Device: {
        Device: TaskInfo
    }[]
}

export interface TaskForm extends TaskInput {
    id: number,
    createdUTC: Date,
    completedUTC: Date | null,
    createUser: string,
    completeUser: string | null,
    status: string
}

export interface DeviceForm extends DeviceInput {
    CH4_SN: string | null
    O2_SN: string | null
    CO2_SN: string | null
    PUMP_SN: string | null
    Task?: any,
    updateUTC: string
}



export type CustomError = {
    message: string
}

export interface CalibrateSensorForm {
    gasType: string
    calType: string,
    calValue: number
}


