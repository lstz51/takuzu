import { Nav } from "react-bootstrap";
import NavBarItem from "./NavBarItem";

function NavBar() {
 return(
    <>
    <Nav variant="tabs">
       <NavBarItem text={"Takuzu"}/> 
       <NavBarItem text={"Classement"}/> 
       <NavBarItem text={"Compte"}/> 
       <NavBarItem text={"Règles"}/> 
    </Nav>
    </>
 );  
}

export default NavBar;