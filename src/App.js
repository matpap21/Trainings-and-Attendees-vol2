import logo from './logo.svg';
import classes from './App.module.css';
import {BrowserRouter as Router} from "react-router-dom";
import AppHeader from "./components/header/AppHeader";
import AppContent from "./components/content/AppContent";

/* wrzucamy te package ponizej do zainstalowania
*
*npm install --save axios
npm install --save react-router-dom
npm install --save @material-ui/core
npm install --save @material-ui/icons
npm install --save react-bootstrap bootstrap@5.1.3
 */
function App() {
    return (
        <div className={classes.App}>
            <Router>
                <AppHeader/>
                <AppContent>

                </AppContent>
            </Router>
        </div>
    );
}

export default App;
