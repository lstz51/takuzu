import { NavItem, NavLink } from "react-bootstrap";

function NavBarItem(props) {
    const {text} = props;
    return (
        <NavItem>
            <NavLink>{text}</NavLink>
        </NavItem>
    );
}

export default NavBarItem;