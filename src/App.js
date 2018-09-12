import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'



import './App.css';
import axios from 'axios';
import ProjectList from './ProjectList'
import User from './User'
import ProjectDetails from './ProjectDetails'
import TaskDetails from './TaskDetails'




class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedInUser: null,
      loginFormShowing: false,
    }

  }


  fetchUser(){
    if( this.state.loggedInUser === null ){
        axios.get(`http://localhost:5000/api/loggedin`, {withCredentials: true})
        .then((response)=>{
            this.setState({
                theTasks: this.state.theTasks,
                showing: this.state.showing,
                loggedInUser:  response.data,
           }) 
        })
        .catch((err)=>{
            this.setState({
              theTasks: this.state.theTasks,
              showing: this.state.showing,
                loggedInUser:  false,
           }) 
        })
    }
}


    getUserFromUserComponent = (userObj)=>{
      this.setState({...this.state, loggedInUser: userObj});
  }

  showUserElseShowLoginButton(){
    if(this.state.loggedInUser){
      return(
        <div>
        <span> Welcome, {this.state.loggedInUser.username} </span>
       <button onClick={()=>{this.logout()}} className="little-green-btn"> Log Out </button>

        </div>
      )
    }else {
      return(
        <div>
                 <button onClick={()=>{this.toggleLoginForm()}} className="little-green-btn"> Log In/Sign Up </button>
        </div>
      )
    }
  }



  logout(){
    axios.post(`http://localhost:5000/api/logout`, {}, {withCredentials: true})
    .then((response)=>{
        this.setState({
            loggedInUser:  null,
        }) 
    })

}

toggleLoginForm(){
  console.log("toggling the form")
  this.setState({...this.state, loginFormShowing: !this.state.loginFormShowing})
}



  showLoginForm(){
    if(this.state.loginFormShowing){
      return(
        <div id = "loginFormWrapper">
        <User toggle={this.toggleLoginForm.bind(this)} theActualUser={this.state.loggedInUser} sendIt={this.getUserFromUserComponent}></User>
      </div>
    )
    
  }
  }




  render() {
    this.fetchUser()
    return (
    <div>

         <div id="theBody">

      {/* <div onClick = {(e)=>{
        if(this.state.loginFormShowing && e.target.tagName !== 'INPUT'){
          this.toggleLoginForm() 
          }
        }} id="theBody"> */}

        <nav>
          <div>
          <Link to="/">Home</Link>
          <Link to="/projectlist">My Projects</Link>
          </div>
          <div>
          {this.showUserElseShowLoginButton()}
          </div>
        </nav>

                    
              {this.showLoginForm()}        
                  


        <div>
          <Route path="/projectlist" render={()=> <ProjectList sendTheUser={this.getUserFromUserComponent} theActualUser={this.state.loggedInUser}/>} />
        </div>


        <div>
          <Route exact path="/oneProject/:id" component={ProjectDetails}   />
        </div>

        <div>
          <Route exact path="/oneProject/:id/oneTask/:taskID" component={TaskDetails}/>
        </div>







        </div>

          <div className="footer">
      <ul> 
        <h4>Copyright AF</h4>
        <li> This Page is Beautiful </li>
        <li> This Page is a strong, self-loving individual </li>
        </ul>

        <ul>
      <h4> All Rights Reserved </h4>
      <li> Property of me cause I chill and you don't even know what chilling even is.  Do you? No! Didn't think so. </li>

      </ul>

      <ul>
        <h4> External Resources </h4>
        <li> Check out the Docs </li>
      </ul>
          </div>


    </div>
    );
  }
}







export default App;
