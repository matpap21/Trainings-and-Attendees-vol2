import classes from "./AttendeesList.module.css";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import CardComponent from "../../CardComponent";
import axios from "axios";

const AttendeesTable = (props) => {

    const handleRemoveRecord = (row) => {
        axios.delete("http://localhost:8080/attendees/" + row.id)
            .then((data) => {
                console.log("Otrzymaliśmy sukces odpowiedź!");
                props.refreshData();
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!");
            });
    }

    return <CardComponent title={'Attendees List'}>
        <div className={classes.TableContainer}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right"/>
                            <TableCell align="right"/>
                            <TableCell align="right"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => {
                            let addButton = (<></>);
                            let removeButton = (<></>);
                            if (props.onAdd) {
                                addButton = (<TableCell align="right">
                                    <Button onClick={() => {
                                        props.onAdd(row.id)
                                    }}>Add</Button>
                                </TableCell>)
                            }
                            if (props.onRemove) {
                                removeButton = (<TableCell align="right">
                                    <Button onClick={() => {
                                        props.onRemove(row.id)
                                    }}>Remove</Button>
                                </TableCell>)
                            }

                            return (<TableRow
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.surname}</TableCell>
                                <TableCell align="right">
                                    {
                                        props.hideDelete ? (<></>):                                    <Button onClick={() => {
                                            handleRemoveRecord(row)
                                        }}>Delete</Button>

                                    }

                                </TableCell>
                                {
                                    (props.isAdded !== undefined && props.isAdded(row.id)) ? removeButton : addButton
                                }

                            </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </CardComponent>
}

export default AttendeesTable;