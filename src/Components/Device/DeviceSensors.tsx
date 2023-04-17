import deviceService from "../../Services/device.service"
import { CalibrateSensorForm, DeviceForm } from "../../Ultils/type"
import { Space, Input, Grid, Box, Title, Button , NumberInput, Select ,Text} from "@mantine/core"
import { useForm } from '@mantine/form';
import { useError } from "../../Hook";

const DeviceSensors = ({ device }: { device: DeviceForm | null }) => {
    const errorMessage = useError()
    const form2 = useForm<CalibrateSensorForm>({
        initialValues: {
            calType: "",
            gasType: "",
            calValue: 1,
        },
        validate: {
            calType: (value) => (value.length < 1 ? 'Gas Type Sensor Type must be selected' : null),
            gasType: (value) => (value.length < 1 ? 'Cal Type Sensor Type must be selected' : null),
        },
    })

    const form3 = useForm<{ sensorType: string }>({
        initialValues: {
            sensorType: ""
        },
        validate: {
            sensorType: (value) => (value.length < 1 ? 'Sensor Type must be selected' : null),
        },
    })

    const calibrate = async (data: CalibrateSensorForm) => {
        const id = device?.id
        if (id !== undefined) {
            try {
                const res = await deviceService.calibrateSensor(id, data)
                console.log(res)
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
    }

    const readSensor = async (data: { sensorType: string }) => {
        const id = device?.id
        if (id !== undefined) {
            try {
                const res = await deviceService.readSensor(id, data.sensorType)
                console.log(res)
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
    }



    return (<>
        <Grid gutter='md' >
            <Grid.Col span={4}>
                <form onSubmit={form3.onSubmit(readSensor)}>
                    <Space h="md" />
                    <Title order={4}>Read</Title>
                    <Space h="md" />
                    <Box maw={440} >
                        <Input.Wrapper
                            id="input-demo"
                            label="Sensor Type:"
                        >
                            <Select data={[
                                { value: 'CO2', label: 'CO2' },
                                { value: 'CH4', label: 'CH4' },
                                { value: 'O2', label: 'O2' },
                                { value: 'TEMP', label: 'TEMP' },
                                { value: 'RH', label: 'RH' },
                                { value: 'BAR', label: 'BAR' },
                            ]}
                                id="input-demo" {...form3.getInputProps('sensorType')} size="md" />
                        </Input.Wrapper>
                    </Box>
                    <Space h="xl" />
                    <Button type="submit">Get </Button>
                </form>
            </Grid.Col>
            <Grid.Col span={4}>
            </Grid.Col>
        </Grid>
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Grid gutter='md' >
            <Grid.Col span={4}>
                <form onSubmit={form2.onSubmit(calibrate)}>
                    <Space h="md" />
                    <Title order={4}>Calibrate</Title>
                    <Space h="md" />
                    <Box maw={440} >
                        <Input.Wrapper
                            id="input-demo"
                            label="Gas Type :"
                        >
                            <Select data={[
                                { value: 'CO2', label: 'CO2' },
                                { value: 'CH4', label: 'CH4' },
                            ]}
                                id="input-demo" {...form2.getInputProps('gasType')} size="md" />
                        </Input.Wrapper>
                    </Box>
                    <Space h="xl" />

                    <Box maw={440} >

                        <Input.Wrapper
                            id="input-demo"
                            label="Cal Type :"
                        >
                            <Select data={[
                                { value: 'ZERO', label: 'ZERO' },
                                { value: 'SPAN', label: 'SPAN' },
                            ]}
                                id="input-demo" {...form2.getInputProps('calType')} size="md" />
                        </Input.Wrapper>
                    </Box>
                    <Space h="xl" />
                    <Box maw={440} >

                        <Input.Wrapper
                            id="input-demo"
                            label="Cal Value :"
                        >
                            <NumberInput
                                precision={2}
                                step={0.05}
                                min={0}
                                id="input-demo"
                                {...form2.getInputProps('calValue')}
                                size="md" />
                        </Input.Wrapper>
                    </Box>
                    <Space h="xl" />

                    <Button type="submit">Calibrate </Button>
                </form>
            </Grid.Col>
            <Grid.Col span={4}>
            </Grid.Col>
        </Grid>
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />


       <Text color='red'>{errorMessage.value}</Text> 



    </>)
}

export default DeviceSensors
