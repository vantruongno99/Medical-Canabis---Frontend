import React, { useState, useEffect } from "react"
import taskService from "../../Services/task.service"
import { useParams } from "react-router-dom"
import { DeviceInfo, TaskForm, TaskInfo } from "../../Ultils/type"
import { Tabs } from "@mantine/core"
import { TaskDetail, TaskDevices } from "../../Components/Task"



const Task = () => {
    const [devices, setDevices] = useState<DeviceInfo[]>([])
    const [task, setTask] = useState<TaskForm | undefined>()
    const params = useParams();


    const getTask = async () => {
        const id = params.id
        if (id !== undefined) {
            try {
                const res: TaskInfo | undefined = await taskService.getTask(id)
                if (res) {
                    console.log(res)
                    const { Device, ...detail } = res
                    const data = {
                        ...detail,
                        startTime: new Date(detail.startTime),
                        endTime: new Date(detail.endTime),
                        createdUTC: new Date(detail.createdUTC),
                        completedUTC: detail.completedUTC ? new Date(detail.completedUTC) : null
                    }
                    setDevices(res.Device.map((a: { Device: any }) => a.Device))
                    setTask(data)
                }

            }
            catch (e) {
                console.log(e)
            }
        }
    }


    useEffect(() => {
        getTask()
    }, [])
    return (
        <>
            <Tabs defaultValue="detail">
                <Tabs.List position="center">
                    <Tabs.Tab value="detail">DETAILS</Tabs.Tab>
                    <Tabs.Tab value="devices">DEVICES</Tabs.Tab>
                    <Tabs.Tab value="settings">TRACKING</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="detail">
                    <TaskDetail task={task} getTask={getTask} />
                </Tabs.Panel>

                <Tabs.Panel value="devices">
                    <TaskDevices devices={devices} task={task} getTask={getTask}/>
                </Tabs.Panel>
            </Tabs>

        </>
    )
}

export default Task