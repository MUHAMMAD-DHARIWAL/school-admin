import "./stdlisting.scss"
import Sidebar from "../../components/sidebar/SideBar"
import Navbar from "../../components/navbar/Navbar"
import ActionTable from "../../components/actiontable/ActionTable"
import { memo } from "react"
const StdListing = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ActionTable/>
      </div>
    </div>
  )
}

export default memo(StdListing);