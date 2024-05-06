import { FloatingLabel, FormControl } from "react-bootstrap";

function AddItemBar() {
    return (
        <>
            <FloatingLabel label="Add">
                <FormControl placeholder="Add" />
            </FloatingLabel>
        </>
    );
}

export default AddItemBar;