import TabList from "../Tab/Tab";
import { Container } from "../core";

function Sidebar(){

    return (
        <Container width="250px" height="100vh" debug>
            <TabList />
        </Container>
    )
}

export default Sidebar;