import classes from './AttendeesForm.module.css';
import CardComponent from "../../CardComponent";
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Grid, TextField} from "@material-ui/core";
import {useState} from "react";
import axios from "axios";



// Model / encja pustej oferty/nowego obiektu
const EMPTY_NEW_ATTENDEE = {
    'id': null,
    'name': null,
    'surname': null,
    'pesel': null,
    'email': null,
    'address': null,

}

const AttendeesForm = () => {
    // Tworząc formularz nadajemy mu stan pustego obiektu
    //  Wartości domyślne formularza kopiowane są z obiektu EMPTY_NEW_TRAINING
    const [editedAttendees, setEditedAttendees] = useState({...EMPTY_NEW_ATTENDEE});


    const handleChangeForm = name => event => {
        setEditedAttendees({...editedAttendees, [name]: event.target.value});
    };


    const handleClearForm = () => {
        setEditedAttendees({...EMPTY_NEW_ATTENDEE})
    }

    const handleSubmit = () => {
        // wysłanie obiektu na serwer
        console.log("Wysyłamy:" + JSON.stringify(editedAttendees))

        axios.post('http://localhost:8080/attendees', editedAttendees)
            .then((data) => {
                console.log("Opowiedz sukces: " + JSON.stringify(data));
            })
            .catch((err) => {
                console.log("Opowiedz porazka: " + JSON.stringify(err));

            })
    }

    return (
        <div>
            <CardComponent title={'Attendees Form'}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <TextField value={editedAttendees.name}
                                   onChange={handleChangeForm("name")}
                                   className={classes.FormStretchField}
                                   label={'Attendees name'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedAttendees.surname}
                                   onChange={handleChangeForm("surname")}
                                   className={classes.FormStretchField}
                                   label={'Attendees surname'} size={'small'} variant="filled"/>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField value={editedAttendees.pesel}
                                   onChange={handleChangeForm("pesel")}
                                   className={classes.FormStretchField}
                                   label={'Attendees pesel'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedAttendees.email}
                                   onChange={handleChangeForm("email")}
                                   className={classes.FormStretchField}
                                   label={'Attendees email'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedAttendees.address}
                                   onChange={handleChangeForm("address")}
                                   className={classes.FormStretchField}
                                   label={'Attendees address'} size={'small'} variant="filled"/>
                    </Grid>

                    <Grid item xs={1}/>
                    <Grid container item xs={10}>
                        <Grid item xs={6}>
                            <Button className={classes.FormStretchField}
                                    size={'small'} variant="contained"
                                    startIcon={<DeleteIcon/>}
                                    onClick={handleClearForm}>
                                Reset
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={classes.FormStretchField}
                                    size={'small'} variant="contained"
                                    onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardComponent>
        </div>
    )
}

export default AttendeesForm;