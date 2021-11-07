import CardComponent from "../../../CardComponent";
import classes from './TrainingDetails.module.css';
import {Link, useParams} from "react-router-dom";
import {Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {useEffect, useState} from "react";
import axios from "axios";
import AttendeesTable from "../../attendees/AttendeesTable";

const TrainingDetails = () => {
    const {trainingId} = useParams();
    const [training, setTraining] = useState({
        'attendees': [],
    });

    const pullRecords = () => {
        axios.get(`http://localhost:8080/trainings/${trainingId}`)
            .then((data) => {
                // data ma pole data
                console.log("Otrzymaliśmy sukces odpowiedź!")
                console.log("Rekordy: " + JSON.stringify(data.data));

                setTraining(data.data);
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }

    useEffect(() => {
        pullRecords();
    }, []);

    return (
        <div>
            <CardComponent title={'Trainings Details'}>
                <Grid container className={classes.DetailsContainer}>
                    <Grid item xs={3}>
                        Name:
                    </Grid>
                    <Grid item xs={9}>
                        {training.name}
                    </Grid>
                    <Grid item xs={3}>
                        Trainer:
                    </Grid>
                    <Grid item xs={9}>
                        {training.trainer}
                    </Grid>
                    <Grid item xs={3}>
                        Start date:
                    </Grid>
                    <Grid item xs={9}>
                        {training.timeStart}
                    </Grid>
                    <Grid item xs={3}>
                        Length (days):
                    </Grid>
                    <Grid item xs={9}>
                        {training.length}
                    </Grid>
                </Grid>
            </CardComponent>
            <div className={classes.AddButtonContainer}>
                <Link to={`/trainings/add/attendee/${training.id}`} className={classes.TrainingsAddButton}>
                    <Button variant="outlined">Manage Attendees</Button>
                </Link>
            </div>
            <AttendeesTable rows={training.attendees} hideDelete ={true} refreshData={pullRecords}/>
        </div>
    )
}
export default TrainingDetails;