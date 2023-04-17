import React, { useState, useEffect } from "react"
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Space, Grid, createStyles, Table, Checkbox, Group, rem, Title } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import taskService from "../../Services/task.service";
import deviceService from "../../Services/device.service";
import { useError } from "../../Hook";
import { useNavigate } from "react-router-dom";
import { TaskInfo, TaskInput } from "../../Ultils/type";
import { DeviceInfo } from "../../Ultils/type";

const useStyles = createStyles((theme) => ({
    rowSelected: {
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                : theme.colors[theme.primaryColor][0],
    },
}));


const CreateTask = () => {
    const [devices, setDevices] = useState<DeviceInfo[]>([])
    const { classes, cx } = useStyles();
    const [selection, setSelection] = useState<string[]>([]);
    const errorMessage = useError()
    const navigate = useNavigate();

    const form = useForm({
        validateInputOnChange: true,
        initialValues: { name: '', logPeriod: 1, startTime: new Date, endTime: new Date },
        // functions will be used to validate values at corresponding key
        validate: {
            name: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null),
            logPeriod: (value) => (value < 0 ? 'You must be at least 18 to register' : null),
            startTime: (value) => (new Date(value) < new Date ? "Date must be in future" : null),
            endTime: (value, values) => (new Date(value) < new Date(values.startTime) ? "End Date must greater than Start Date" : null),
        },
    });

    const newTask = async (data: TaskInput) => {
        try {
            const res: TaskInfo | undefined = await taskService.createTask(data)
            if (res) {
                selection.length !== 0 && selection.forEach(async (a) => {
                    await taskService.assignTask(res.id, a);
                
                })
                
                navigate(`/task/${res.id}`)
            }
            
        }

        catch (e) {
            if (e instanceof Error) {
                errorMessage.set(e.message)
            }
            else {
                errorMessage.set("Unknown Error")
            }
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

    useEffect(() => {
        getAvailbleDevice()
    }
        , [])


    return (
        <>
            <Grid gutter="lg">
                <Grid.Col span={4}>
                    <Title order={3}>Details</Title>
                    <Space h="xl" />
                    <Box maw={320}>
                        <form onSubmit={form.onSubmit(newTask)}>
                            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                            <Space h="xs" />
                            <NumberInput
                                mt="sm"
                                label="Log Period"
                                placeholder="Log Period"
                                min={0}
                                max={30}
                                {...form.getInputProps('logPeriod')}
                            />
                            <Space h="xs" />

                            <DateTimePicker
                                placeholder="Start Date"
                                label="Start Date"
                                withAsterisk
                                {...form.getInputProps('startTime')}
                            />
                            <Space h="xs" />

                            <DateTimePicker
                                placeholder="End Date"
                                label="End Date"
                                withAsterisk
                                {...form.getInputProps('endTime')}
                            />

                            <Space h="md" />
                            <Button type="submit" disabled={Object.keys(form.errors).length !== 0} mt="sm">
                                Submit
                            </Button>
                            <Space h="md" />

                            {errorMessage.value}
                        </form>
                    </Box>
                </Grid.Col>
                <Grid.Col span={1}>
                </Grid.Col>

                <Grid.Col span={7}>
                    <Title order={3}>Available Sensors</Title>
                    <Space h="xl" />
                    <Table fontSize="md" withBorder >
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Grid.Col>
            </Grid>

        </>
    )
}

export default CreateTask