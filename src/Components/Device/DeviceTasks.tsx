
import {  TaskInfo } from "../../Ultils/type"
import { Box, Table, Anchor } from "@mantine/core"
import moment from "moment"

const DeviceTasks = ({ tasks }: { tasks: TaskInfo[] }) => {

    const rows = tasks.map((element) => (
        <tr key={element.id}>
            <td> <Anchor href={`/task/${element.id}`} target="_blank">
                {element.id}
            </Anchor></td>
            <td>{element.name}</td>
            <td> {moment(element.startTime).format('DD/MM/yyyy HH:mm')}</td>
            <td>{moment(element.endTime).format('DD/MM/yyyy HH:mm')}</td>
            <td>{element.createUser}</td>
            <td>{element.status}</td>
        </tr>
    ))

    return (<>
        <Box p={20} >
            <Table fontSize="md">
                <thead>
                    <tr>
                        <th>Task No.</th>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Created By</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </Box></>)

}

export default DeviceTasks
