import { Outlet } from "react-router-dom"
const Home = () => {
    return (
        <>
            <p>
                Hello world
                <Outlet/>
            </p>
        </>
    )
}

export default Home