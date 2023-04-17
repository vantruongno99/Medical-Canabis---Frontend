import React, { useState, useEffect } from "react"
import taskService from "../../Services/task.service"
import { useParams, useNavigate } from "react-router-dom"
import { DeviceInfo, TaskForm, TaskInfo } from "../../Ultils/type"
import { Space, Input, Grid, Box, Title, NumberInput, Tabs, Table, Anchor, Text, Button, Menu, Group, ActionIcon, rem, Modal, createStyles, Checkbox } from "@mantine/core"
import { IconCirclePlus } from '@tabler/icons-react';
import deviceService from "../../Services/device.service"

const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                : theme.colors[theme.primaryColor][0],
    },
}));


const TaskDevicesAssign = ({ task, handleAssign }: { task: TaskForm | undefined, handleAssign: (taskId: number, selection: string[]) => Promise<void> }) => {
    const { classes, cx } = useStyles();
    const [selection, setSelection] = useState<string[]>([]);
    const [opened, setOpened] = useState<boolean>(false)
    const [devices, setDevices] = useState<DeviceInfo[]>([])


    const assign = async () => {
        const taskId = task?.id
        if (taskId) {
            handleAssign(taskId, selection)
            setSelection([])
            setOpened(false)
        }
    }

    const getAvailbleDevice: () => Promise<void> = async () => {
        try {
            const response: DeviceInfo[] | undefined = await deviceService.getAvaibleDeviceByTime()
            response && setDevices(response)
        }
        catch (e) {
            console.log(e)
        }
    }


    const rows = devices.map((item) => {
        const selected = selection.includes(item.id);
        return (
            <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
                <td>
                    <Checkbox
                        checked={selection.includes(item.id)}
                        onChange={() => toggleRow(item.id)}
                        transitionDuration={0}
                    />
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
            </tr>
        );
    });
    const toggleRow = (id: string) =>
        setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );

    return (<>
        <Box p={20} >
            <ActionIcon color="blue" size="lg" radius="xl" variant="light" onClick={() => {
                setOpened(true)
                getAvailbleDevice()
                setSelection([])
            }}>
                <IconCirclePlus />
            </ActionIcon >
            <Modal title="Assign Sensors" opened={opened} onClose={() => setOpened(false)} withCloseButton={false} centered>
                {rows.length !== 0 ? <Table fontSize="md" >
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table> : <Text>
                    No Device Avaiavle
                </Text>
                }
                <Space h="xl" />
                <Group position="right">
                    <Button disabled={rows.length === 0} onClick={() => assign()}>
                        Assign
                    </Button>
                </Group>
            </Modal>
        </Box>

    </>)
}

export default TaskDevicesAssign