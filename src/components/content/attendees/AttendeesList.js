import CardComponent from "../../CardComponent";
import classes from './AttendeesList.module.css'
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


const AttendeesList = () => {
    const [rows, setRows] = useState([]); /*inicjalny stan wierzy zeby tablica byla pusta a zdefiniowana*/

    const pullRecordsFromDatabaseServer = () => {
        axios.get("http://localhost:8080/attendees")
            .then((data) => {
                // data ma pole data
                console.log("Otrzymaliśmy sukces odpowiedź!")
                console.log("Rekordy: " + JSON.stringify(data.data));

                setRows(data.data);
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }

    useEffect(() => {
        pullRecordsFromDatabaseServer();
    }, [])

    const handleRemoveRecord = (row)=> {
        axios.delete("http://localhost:8080/attendees/" + row.id)
            .then((data) => {
                console.log("Otrzymaliśmy sukces odpowiedź!");
                pullRecordsFromDatabaseServer();
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!");
            });
    }

    return (
        <div>
            <div className={classes.AddButtonContainer}>
                <Link to={"/attendees/add"} className={classes.TrainingsAddButton}>
                    <Button variant="outlined">Add New</Button>
                </Link>
            </div>
            <CardComponent title={'Attendees List'}>
                <div className={classes.TableContainer}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">First Name</TableCell>
                                    <TableCell align="right">Last Name</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                    <TableCell align="right">Details</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.surname}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => {handleRemoveRecord(row)}}>Delete</Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button onClick={handleRemoveRecord}>Edit</Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button onClick={handleRemoveRecord}>Details</Button>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </CardComponent>
        </div>
    )
}
export default AttendeesList;