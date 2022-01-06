import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header';
import AddUser from './components/users';
import LoginUser from './components/login'
// import Footer from './components/footer';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/register" component = { AddUser }></Route>
        <Route path="/login" component = { LoginUser }></Route>
        {/* <AddUser /> */}
        {/* <Footer /> */}
        <br /><br />
        {/* <center>
          <h1>Welcome to the User Registration System</h1>
        </center> */}
        
      </div>
    </Router>
  );
};

export default App;
