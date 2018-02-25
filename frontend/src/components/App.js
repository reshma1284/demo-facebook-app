import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomePage from './HomePage';
import MessagesPage from './MessagesPage';
import Timeline from './Timeline';
import EditPage from './EditPage';

class App extends React.Component{
  render(){
    return(
      <Router>
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/timeline' component={Timeline} />
              <Route path='/messages' component={MessagesPage} />
              <Route path='/edit/:id' component={EditPage} />
          </Switch>
      </Router>
    )


  }
}

export default App;
