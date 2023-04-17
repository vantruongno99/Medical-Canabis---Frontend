import  { useEffect } from "react"
import taskService from "../../Services/task.service"
import { useNavigate } from "react-router-dom"
import { EditTaskInput, TaskInfo, TaskForm } from "../../Ultils/type"
import { Space, Input, Grid, Box, Title, NumberInput,  Text, Button, Menu, Group, ActionIcon, Badge } from "@mantine/core"
import { IconCircleCheck, IconPlayerPlay, IconPlayerPause , IconTrash } from '@tabler/icons-react';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';

const TaskDetail = ({ getTask, task }: { getTask: () => Promise<void>, task: TaskForm | undefined }) => {
    const navigate = useNavigate();
    const form = useForm<TaskForm>(
        {
            initialValues : task,
            validate: {
                name: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null),
                logPeriod: (value) => (value < 0 ? 'You must be at least 18 to register' : null),
                endTime: (value, values) => (new Date(value) < new Date(values.startTime) ? "End Date must greater than Start Date" : null),
            },
        }
    );

    useEffect(() => {
        if(task) form.setValues(task)
    }, [task])



    const handleUpdate = async (data: TaskForm) => {
        const id = task?.id
        if (id !== undefined) {
            try {
                const input: EditTaskInput = {
                    endTime: new Date(data.endTime),
                    id: data.id,
                    name: data.name,
                    logPeriod: data.logPeriod
                }
                const res: TaskInfo | undefined = await taskService.updateTask(input)
                await getTask()

            }
            catch (e) {
                console.log(e)
            }
        }
    }


    const handleComplete = async () => {
        const id = task?.id
        if (id !== undefined) {
            try {
                await taskService.completeTask(id)
                getTask()
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    const handleDelete = async () => {
        const id = task?.id
        if (id !== undefined) {
            try {
                await taskService.deleteTask(id)
                navigate('/task')
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    const handleResume = async () => {
        const id = task?.id
        if (id !== undefined) {
            try {
                await taskService.resumeTask(id)
                getTask()
            }
            catch (e) {
                console.log(e)
            }
        }
    }
    const handlePause = async () => {
        const id = task?.id
        if (id !== undefined) {
            try {
                await taskService.pauseTask(id)
                getTask()
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    const statusColor = (status: string): string => {
        switch (status) {
            case "ONGOING": return "blue"
            case "PAUSED": return "orange"
            case "COMPLETED": return "green"
            default:
                return ""
        }
    }

    const menuOptions = () => {

        if (form.values.status === "COMPLETED") {
            return <></>
        }
        return (
            <Menu.Dropdown>
                {
                    form.values.status === "ONGOING" && <Menu.Item color="orange" onClick={() => handlePause()} icon={<IconPlayerPause size="2rem" stroke={1} />}>
                        Pause
                    </Menu.Item>
                }
                {
                    form.values.status === "PAUSED" && <Menu.Item color="blue" onClick={() => handleResume()} icon={<IconPlayerPlay size="2rem" stroke={1} />}>
                        Resume
                    </Menu.Item>
                }
                <Menu.Item color="green" onClick={() => handleComplete()} icon={<IconCircleCheck size="2rem" stroke={1.5} />}>
                    Complete
                </Menu.Item>
            </Menu.Dropdown>
        )
    }

    return (
        <form onSubmit={form.onSubmit(handleUpdate)} >
            <Group position="right">
                <ActionIcon color="red" size="lg" radius="xs" variant="light" onClick={() => handleDelete()}>
                    <IconTrash />
                </ActionIcon >
            </Group>
            <Title order={3} color="blue">Information</Title>
            <Space h="xl" />
            <Grid gutter="xl" >
                <Grid.Col span={4}>
                    <Box maw={440} >
                        <Input.Wrapper
                            id="input-demo"
                            label="ID :"
                        >
                            <Input id="input-demo"  {...form.getInputProps('id')} size="md" disabled />
                        </Input.Wrapper>
                    </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Box maw={440} >

                        <Input.Wrapper
                            id="input-demo"
                            label="Name :"
                        >
                            <Input id="input-demo" {...form.getInputProps('name')} size="md" />
                        </Input.Wrapper>
                    </Box>

                </Grid.Col>
                <Grid.Col span={4}>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Box maw={440} >
                        <DateTimePicker
                            placeholder="Start Date"
                            label="Start Date :"
                            disabled
                            {...form.getInputProps('startTime')}
                            size="md"

                        />
                    </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Box maw={440} >
                        <DateTimePicker
                            placeholder="End Date"
                            label="End Date :"
                            {...form.getInputProps('endTime')}
                            size="md"

                        />
                    </Box>

                </Grid.Col>
                <Grid.Col span={4}>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Group noWrap spacing="xl">
                        <Text fw={500}>Status : </Text>
                        <Menu trigger="hover" position="right-start" openDelay={100} closeDelay={400}>
                            <Menu.Target>
                                <Badge size="lg" variant="dot" color={statusColor(form.values.status)}>{form.values.status}</Badge >
                            </Menu.Target>
                            {menuOptions()}
                        </Menu>
                    </Group>
                </Grid.Col>
            </Grid>
            <Space h="xl" />
            <Space h="xl" />
            <Title order={3} color="blue">Detail</Title>
            <Space h="xl" />

            <Grid gutter="xl" >
                <Grid.Col span={4}>
                    <Box maw={440} >
                        <DateTimePicker
                            placeholder="createdUTC"
                            label="Created At"
                            disabled
                            {...form.getInputProps('createdUTC')}
                            size="md"
                        />
                    </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Box maw={440} >

                        <Input.Wrapper
                            id="input-demo"
                            label="Created By"
                        >
                            <Input disabled id="input-demo" size="md" {...form.getInputProps("createUser")} />
                        </Input.Wrapper>
                    </Box>

                </Grid.Col>
                <Grid.Col span={4}>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Box maw={440} >
                        <DateTimePicker
                            label="Completed At"
                            {...form.getInputProps('completedUTC')}
                            disabled
                            size="md"
                        />
                    </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Box maw={440} >

                        <Input.Wrapper
                            id="PUMP_SN"
                            label="Completed By"
                        >
                            <Input disabled id="input-demo" size="md" {...form.getInputProps("completeUser")} />
                        </Input.Wrapper>
                    </Box>

                </Grid.Col>
                <Grid.Col span={4}>
                </Grid.Col>

            </Grid>
            <Space h="xl" />
            <Space h="xl" />
            <Title order={3} color="blue">Profile</Title>
            <Space h="xl" />

            <Grid gutter='md' >
                <Grid.Col span={4}>
                    <Box maw={440} >
                        <Input.Wrapper
                            id="input-demo"
                            label="Period"
                        >
                            <NumberInput
                                id="input-demo"
                                size="md" {...form.getInputProps("logPeriod")}
                            />
                        </Input.Wrapper>
                    </Box>
                </Grid.Col>

            </Grid>
            <Space h="xl" />
            <Button type="submit" mt="sm">
                Save Changes
            </Button>
        </form>)
}

export default TaskDetail