import Sidebar from "../components/Sidebar";
import Board from "../components/Board";
import NavBar from "../components/NavBar";

const Tasks = ({taskRefetch}) => {
    return(
    <div className="d-flex flex-column">
        <NavBar></NavBar>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <Board taskRefetch={taskRefetch}></Board>
        </div>
    </div>
    )

}
export default Tasks;