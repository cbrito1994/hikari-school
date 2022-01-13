import '../css/App.css';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoursesInfo from './CoursesInfo';
import Checkout from './Checkout';
import Cursos from './Cursos';
import PaymentFinished from './PaymentFinished';
import Katei from './Katei';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PageNavigation from './PageNavigation';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-203166093-1');
const promise = loadStripe('pk_test_51J6O68BUC2HLh0w9pNk5OI0eMd1MRYaGyK0GV3MgykyvWJSrktVbbMb6nV0WFYg3poClFF7zBgknaacNrfZcBGym00J48s3AT5')

function App() {
  return (
    <Router>
      <div className="App">
        <PageNavigation />
        <Switch>
          <Route path="/courses">
            <Cursos />
          </Route>
          <Route path="/coursesInfo/:courseName">
            <CoursesInfo />
          </Route>
          <Route path="/katei">
            <Katei />
          </Route>
          <Route path="/checkout">
            <Elements stripe={promise} >
              <Checkout />
            </Elements>
          </Route>
          <Route path="/paymentFinished">
            <PaymentFinished />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
