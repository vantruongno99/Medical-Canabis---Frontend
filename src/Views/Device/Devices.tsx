import React, { useState, useEffect } from "react"
import deviceService from "../../Services/device.service"
import { DeviceInfo } from "../../Ultils/type"
import { Table, Anchor, Button, Group , Space} from '@mantine/core'
import { useLocation ,useNavigate} from 'react-router-dom';

const Devices = () => {
    const [devices, setDevices] = useState<DeviceInfo[]>([])
    const navigate = useNavigate()

    const getDevice = async () => {
        try {
            const res: DeviceInfo[] | undefined = await deviceService.getAllDevices()
            if (res && res?.length > 0) {
                console.log(res)
                setDevices(res)
            }

        }
        catch (e) {
            console.log(e)
        }
    }

    const location = useLocation();


    const rows = devices.map((element) => (
        <tr key={element.id}>
            <td> <Anchor href={`${location.pathname}/${element.id}`} target="_blank">
                {element.id}
            </Anchor></td>
            <td>{element.name}</td>
            <td>{element.CH4_SN}</td>
            <td>{element.O2_SN}</td>
            <td>{element.CO2_SN}</td>
            <td>{element.PUMP_SN}</td>
        </tr>
    ))


    useEffect(() => {
        getDevice()
    }, [])



    return (
        <>
            <Group position="right">
                <Button onClick={()=>navigate(`${location.pathname}/new`)}>
                    New Device
                </Button>
            </Group>
            <Space h="xl" />
            <Table  fontSize="md">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>CH4_SN</th>
                        <th>O2_SN</th>
                        <th>CO2_SN</th>
                        <th>PUMP_SN</th>

                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    )
}

export default Devices