import  { useState, useEffect } from "react"
import deviceService from "../../Services/device.service"
import { useParams } from "react-router-dom"
import { DeviceForm, TaskInfo } from "../../Ultils/type"
import { Tabs} from "@mantine/core"
import moment from "moment"
import { DeviceDetail, DeviceTasks, DeviceSensors } from "../../Components/Device"



const Device = () => {
    const [device, setDevice] = useState<DeviceForm | null>(null)
    const [tasks, setTasks] = useState<TaskInfo[]>([])
    const params = useParams();
    const getDevice = async () => {
        const id = params.id
        if (id !== undefined) {
            try {
                const res = await deviceService.getDevice(id)
                if (res) {
                    setDevice(res)
                    const { Task, ...detail } = res
                    setTasks(res.Task.map(a => a.Task))
                    setDevice({ ...detail, updateUTC: moment(detail.updateUTC).format('DD/MM/yyyy HH:mm') })
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        getDevice()
    }, [])
    return (
        <>
            <Tabs defaultValue="detail">
                <Tabs.List position="center">
                    <Tabs.Tab value="detail">DETAILS</Tabs.Tab>
                    <Tabs.Tab value="tasks">TASKS</Tabs.Tab>
                    <Tabs.Tab value="sensors">SENSORS</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="tasks">
                    <DeviceTasks tasks={tasks} />
                </Tabs.Panel>

                <Tabs.Panel value="detail">
                    < DeviceDetail device={device} getDevice={getDevice} />
                </Tabs.Panel>
                <Tabs.Panel value="sensors">
                    <DeviceSensors device={device} />
                </Tabs.Panel>

            </Tabs>

        </>
    )
}

export default Device