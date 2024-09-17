import Sidebar from "../components/Sidebar";
import Board from "../components/Board";
import NavBar from "../components/NavBar";

const Tasks = () => {
    return(
    <div className="d-flex flex-column">
        <NavBar></NavBar>
        <div className="d-flex">
            <Sidebar></Sidebar>
            <Board></Board>
        </div>
    </div>
    )

}
export default Tasks;