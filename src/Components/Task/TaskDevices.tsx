import React, { useState, useEffect } from "react"
import taskService from "../../Services/task.service"
import { useParams, useNavigate } from "react-router-dom"
import { DeviceInfo, TaskForm, TaskInfo } from "../../Ultils/type"
import { Space, Input, Grid, Box, Title, NumberInput, Tabs, Table, Anchor, Text, Button, Menu, Group, ActionIcon, rem, Modal, createStyles, Checkbox } from "@mantine/core"
import TaskDevicesAssign from "./TaskDevicesAssign"
import { IconX } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                : theme.colors["red"][2],
    },
}));


const TaskDevices = ({ devices, task, getTask }: { devices: DeviceInfo[], task: TaskForm | undefined, getTask: () => Promise<void> }) => {
    const { classes, cx } = useStyles();
    const [selection, setSelection] = useState<string[]>([]);

    const handleUnassign = async () => {
        const taskId = task?.id
        if (taskId && selection.length > 0) {
            try {
                for (const deviceId of selection) {
                    await taskService.unassignTask(taskId, deviceId)
                }
                setSelection([])
                await getTask()

            }
            catch (e) {
                console.log(e)
            }
        }
    }

    const handleAssign = async (taskId: number, selection: string[]) => {
        if (taskId && selection.length > 0) {
            try {
                for (const deviceId of selection) {
                    await taskService.assignTask(taskId, deviceId)
                }
                await getTask()

            }
            catch (e) {
                console.log(e)
            }
        }
    }

    const toggleRow = (id: string) =>
        setSelection((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );

    const rows = devices.map((element: any) => {
        const selected = selection.includes(element.id);

        return (
            <tr key={element.id} className={cx({ [classes.rowSelected]: selected })}>
                <td>
                    <Checkbox
                        icon={IconX}
                        checked={selection.includes(element.id)}
                        onChange={() => toggleRow(element.id)}
                        transitionDuration={0}
                        color="red"
                    />
                </td>
                <td> <Anchor href={`/device/${element.id}`} target="_blank">
                    {element.id}
                </Anchor></td>
                <td>{element.name}</td>
            </tr>
        )
    }
    )

    return (<>
        <Box p={20} >
            <Group position="apart">
                <Text fz="lg">Assigned Devices :</Text>
                <TaskDevicesAssign task={task} handleAssign={handleAssign} />

            </Group>

            <Table fontSize="md">
                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>ID</th>
                        <th>Name</th>

                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            <Space h="xl" />
            {
                selection.length !== 0 && <Button color="red" onClick={() => handleUnassign()}>
                    Remove
                </Button>
            }
        </Box>

    </>)
}

export default TaskDevices