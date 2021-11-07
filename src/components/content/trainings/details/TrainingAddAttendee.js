import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import AttendeesTable from "../../attendees/AttendeesTable";

const TrainingAddAttendee = () => {
    // dzięki temu że otrzymujemy trainingId, możliwe jest późniejsze dodanie
    //  attendee do danego szkolenia/training.
    const {trainingId} = useParams();
    const [attendees, setAttendees] = useState([])
    const [training, setTraining] = useState({
        'attendees': [],
    })

    const pullAttendees = () => {
        axios.get("http://localhost:8080/attendees")
            .then((data) => {
                // data ma pole data
                console.log("Otrzymaliśmy sukces odpowiedź!")
                console.log("Rekordy: " + JSON.stringify(data.data));

                setAttendees(data.data);
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }

    const pullTraining = () => {
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

    const addAttendeeToTraining = (idAttendee) => {
        console.log("Removing: " + idAttendee)
        axios.post(`http://localhost:8080/trainings/attendee/${trainingId}/${idAttendee}`)
            .then((data) => {
                // data ma pole data
                console.log("Otrzymaliśmy sukces odpowiedź!")
                console.log("Rekordy: " + JSON.stringify(data.data));

                pullTraining();
                pullAttendees();
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }

    const removeAttendeeFromTraining = (idAttendee) => {
        console.log("Adding: " + idAttendee)
        axios.delete(`http://localhost:8080/trainings/attendee/${trainingId}/${idAttendee}`)
            .then((data) => {
                // data ma pole data
                console.log("Otrzymaliśmy sukces odpowiedź!")
                console.log("Rekordy: " + JSON.stringify(data.data));

                pullTraining();
                pullAttendees();
            })
            .catch((error) => {
                console.log("Otrzymaliśmy odpowiedź o błędzie!")
            });
    }

    const isAttendeeAdded = (attendeeId) => {
        for (let trainingAttendeeId in training.attendees){
            if(training.attendees[trainingAttendeeId].id === attendeeId){
                return true;
            }
        }
        return false
    }

    useEffect(() => {
        pullAttendees();
        pullTraining();
    }, [])

    return (
        <div>
            <AttendeesTable rows={attendees}
                            hideDelete={true}
                            onAdd={addAttendeeToTraining}
                            onRemove={removeAttendeeFromTraining}
                            isAdded={isAttendeeAdded}/>
        </div>
    )
}
export default TrainingAddAttendee;