import {  useEffect } from "react"
import deviceService from "../../Services/device.service"
import {  useNavigate } from "react-router-dom"
import {  DeviceForm} from "../../Ultils/type"
import { Space, Input, Grid, Box, Title, Button, Group, ActionIcon } from "@mantine/core"
import {
    IconTrash
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';

const DeviceDetail = ({ device, getDevice }: { device: DeviceForm | null, getDevice: () => Promise<void> }) => {
    const navigate = useNavigate();

    const form = useForm<DeviceForm>({
        initialValues: {
            id: "",
            name: "",
            updateUTC: "",
            CH4_SN: "",
            PUMP_SN: "",
            CO2_SN: "",
            O2_SN: "",
        },
        validate: {
            name: (value) => (value.length < 5 ? 'Name must have at least 5 letters' : null),
        },
        // functions will be used to validate values at corresponding key
    });


    const updateDevice = async (data: DeviceForm) => {
        try {
            const { updateUTC, ...detail } = data
            await deviceService.editDevice(detail)
            await getDevice()
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteDevice = async () => {
        const id = device?.id
        if (id !== undefined) {
            try {
                await deviceService.deleteDevice(id)
                navigate('/device')
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        if(device) form.setValues(device)
    }, [device])


    return (<>
        <form onSubmit={form.onSubmit(updateDevice)}>
            <Group position="right">
                <ActionIcon color="red" size="lg" radius="xs" variant="light" onClick={() => deleteDevice()}>
                    <IconTrash />
                </ActionIcon >
            </Group>
            <Title order={3} color="blue">Information</Title>
            <Space h="xl" />
            <Grid gutter='md' >
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
                        <Input.Wrapper
                            id="input-demo"
                            label="Last Update :"
                        >
                            <Input id="input-demo" {...form.getInputProps('updateUTC')} disabled size="md" />
                        </Input.Wrapper>
                    </Box>

                </Grid.Col>
            </Grid>
            <Space h="xl" />
            <Space h="xl" />

            <Space h="xl" />


            <Title order={3} color="blue">Sensor Detail</Title>
            <Space h="xl" />

            <Grid gutter='md' >
                <Grid.Col span={4}>
                    <Box maw={440} >
                        <Input.Wrapper
                            id="input-demo"
                            label="CH4 SN :"
                        >
                            <Input id="input-demo" size="md" {...form.getInputProps("CH4_SN")} />
                        </Input.Wrapper>
                    </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Box maw={440} >

                        <Input.Wrapper
                            id="input-demo"
                            label="O2 SN :"
                        >
                            <Input id="input-demo" size="md" {...form.getInputProps("O2_SN")} />
                        </Input.Wrapper>
                    </Box>

                </Grid.Col>
                <Grid.Col span={4}>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Box maw={440} >
                        <Input.Wrapper
                            id="CO2_SN"
                            label="CO2 SN :"
                        >
                            <Input id="input-demo" size="md" {...form.getInputProps("CO2_SN")} />
                        </Input.Wrapper>
                    </Box>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Box maw={440} >

                        <Input.Wrapper
                            id="PUMP_SN"
                            label="PUMP SN :"
                        >
                            <Input id="input-demo" size="md" {...form.getInputProps("PUMP_SN")} />
                        </Input.Wrapper>
                    </Box>

                </Grid.Col>
                <Grid.Col span={4}>
                </Grid.Col>

            </Grid>
            <Space h="xl" />
            <Button type="submit" mt="sm">
                Save Changes
            </Button>
        </form>

    </>)
}

export default DeviceDetail