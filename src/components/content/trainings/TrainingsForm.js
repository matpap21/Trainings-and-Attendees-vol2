import classes from './TrainingsForm.module.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CardComponent from "../../CardComponent";
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Grid, TextField} from "@material-ui/core";
import {useState} from "react";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";

const getDateStringFromDateObject = (dateObject) => {
    let ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(dateObject);
    let mo = new Intl.DateTimeFormat('en', {month: 'numeric'}).format(dateObject);
    let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(dateObject);


    return `${ye}-${mo}-${da}`
}

// Model / encja pustej oferty/nowego obiektu
const EMPTY_NEW_TRAINING = {
    'id': null,
    'name': null,
    'timeStart': getDateStringFromDateObject(new Date),
    'length': 1,
    'trainer': null,
}

const TrainingsForm = () => {
    // Tworząc formularz nadajemy mu stan pustego obiektu
    //  Wartości domyślne formularza kopiowane są z obiektu EMPTY_NEW_TRAINING
    const [editedTraining, setEditedTraining] = useState({...EMPTY_NEW_TRAINING});
    const [timeStart, setTimeStart] = useState(new Date());

    const handleChangeForm = name => event => {
        setEditedTraining({...editedTraining, [name]: event.target.value});
    };

    const handleDateChangeForm = name => date => {
        const finalDate = getDateStringFromDateObject(date)
        setTimeStart(date)
        setEditedTraining({...editedTraining, [name]: finalDate});
    };

    const handleClearForm = () => {
        setEditedTraining({...EMPTY_NEW_TRAINING})
    }

    const handleSubmit = () => {
        // wysłanie obiektu na serwer
        console.log("Wysyłamy:" + JSON.stringify(editedTraining))

        axios.post('http://localhost:8080/trainings', editedTraining)
            .then((data)=>
        {
            console.log("Opowiedz sukces: " + JSON.stringify(data));
        })
        .catch((err) =>{
                console.log("Opowiedz porazka: " + JSON.stringify(err));

            })
        }

    return (
        <div>
            <CardComponent title={'Training Form'}>
                <Grid container className={classes.FormContainer}>
                    <Grid item xs={12}>
                        <TextField value={editedTraining.name}
                                   onChange={handleChangeForm("name")}
                                   className={classes.FormStretchField}
                                   label={'Training name'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedTraining.trainer}
                                   onChange={handleChangeForm("trainer")}
                                   className={classes.FormStretchField}
                                   label={'Trainer'} size={'small'} variant="filled"/>
                    </Grid>
                    <Grid item xs={12}>
                        <DatePicker selected={timeStart}
                                    onChange={handleDateChangeForm("timeStart")}>
                        </DatePicker>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={editedTraining.length}
                                   onChange={handleChangeForm("length")}
                                   className={classes.FormStretchField}
                                   type="number"
                                   inputProps={{
                                       'min': 1,
                                       'max': 10,
                                       'step': 1,
                                   }}
                                   label={'Length (days)'} size={'small'} variant="filled"/>
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

export default TrainingsForm;