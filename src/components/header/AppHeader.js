import classes from "./AppHeader.module.css";
import {Link} from 'react-router-dom';

import Storage from '@material-ui/icons/Storage'
import PeopleAlt from '@material-ui/icons/PeopleAlt'
import AddComment from '@material-ui/icons/AddComment'
import logo from "../../logo.svg";

const HEADER_BUTTONS = [

    {
        name: 'Trainings', /* Link do tablicy z listą rekordów/danych */
        href: '/trainings',
        icon: (<Storage fontSize={"small"}/>),
    },
    {
        name: 'Attendees',
        href: '/attendees',
        icon: (<PeopleAlt fontSize={"small"}/>),
    },
    {
        name: 'Home',
        href: '/',
        icon: (<></>),  /* Brak ikony */
    },
]

const AppHeader = () => {

    const mapToHeaderButton = (buttonInfo) => {
        return (
            /* Link zostanie zastąpiony/zaprezentowany w postaci <a> */
            <Link key={buttonInfo.name} to={buttonInfo.href} className={classes.HeaderMenuButton}>
                {buttonInfo.icon}
                <div>{buttonInfo.name}</div>
            </Link>
        )
    }

    return (
        <header className={classes.AppHeader}>
            <div className={classes.HeaderLeft}>
                <img src={logo} className={classes.AppLogo} alt="logo"/>
            </div>
            <div className={classes.HeaderRight}>
                {
                    HEADER_BUTTONS.map(mapToHeaderButton)
                }
            </div>
        </header>
    );
}

export default AppHeader;