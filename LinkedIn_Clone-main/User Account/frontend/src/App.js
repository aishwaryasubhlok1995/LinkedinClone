import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Login from './components/Account/SignupLogin';
import logo from './logo.svg';
import {BrowserRouter} from 'react-router-dom';
import Homepage from './components/Account/Homepage';
import PostSignUp from './components/Account/PostSignUp';
import details from './components/Account/details';
import schooldata from './components/Account/schooldetails';
import photo from './components/Account/photo';
class App extends Component
{
  render() {
    return (
      <BrowserRouter>
      <div>
      <Route path="/login" component={Login}/>
      <Route path="/homepage" component={Homepage}/>
      <Route path="/postsignup" component={PostSignUp}/>
      <Route path="/details" component={details}/>
      <Route path="/schooldetails" component={schooldata}/>
      <Route path="/photo" component={photo}/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
