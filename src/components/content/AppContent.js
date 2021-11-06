import classes from "./AppContent.module.css";
import {Route, Switch} from "react-router-dom";
import ContentHome from "./home/ContentHome";
import TrainingsList from "./trainings/TrainingsList";
import TrainingsForm from "./trainings/TrainingsForm";
import AttendeesList from "./attendees/AttendeesList";
import AttendeesForm from "./attendees/AttendeesForm";
import TrainingDetails from "./trainings/details/TrainingDetails";


const AppContent = () => {
    return (
        <div className={classes.AppContent}>
            <Switch>
                <Route path={'/trainings/details/:trainingId'}>
                    <TrainingDetails/>
                </Route>
                <Route path={'/trainings/add'}>
                    <TrainingsForm/>
                </Route>
                <Route path={'/trainings'}>
                    <TrainingsList/>
                </Route>

                <Route path={'/attendees/add'}>
                    <AttendeesForm/>
                </Route>
                <Route path={'/attendees'}>
                    <AttendeesList/>
                </Route>


                <Route path={'/'}>
                    <ContentHome/>
                </Route>
            </Switch>
        </div>

    )
}

export default AppContent;