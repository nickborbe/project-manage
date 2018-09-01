import React, { Component } from 'react';
import axios from 'axios';


class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            usernameInput: '',
            passwordInput: '',
            loggedInUser: null,
        }
    }



    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, loggedInUser: nextProps["theActualUser"]})
      }
    

    updatePassword(e){
        this.setState({
            usernameInput: this.state.usernameInput,
            passwordInput: e.target.value,
        })
       
 
    }
    updateUsername(e){
            this.setState({
                usernameInput: e.target.value,
                passwordInput: this.state.passwordInput,
            })
    }

    login(){
        const username = this.state.usernameInput;
        const password = this.state.passwordInput;
        axios.post(`http://localhost:5000/api/login`, {username, password }, {withCredentials: true})
        .then((response)=>{
            this.props.toggle()
            this.setState({
                usernameInput: '',
                passwordInput: '',
                loggedInUser:  response.data,
            }) 
            this.props.sendIt(response.data)
        })
    }

    signup(){
        const username = this.state.usernameInput;
        const password = this.state.passwordInput;
        axios.post(`http://localhost:5000/api/signup`, {username, password }, {withCredentials: true})
        .then((response)=>{
            this.props.toggle()
            this.setState({
                usernameInput: '',
                passwordInput: '',
                loggedInUser:  response.data,
            }) 
            this.props.sendIt(response.data)
        })
    }

    logout(){
        const username = this.state.usernameInput;
        const password = this.state.passwordInput;
        axios.post(`http://localhost:5000/api/logout`, {}, {withCredentials: true})
        .then((response)=>{
            this.setState({
                usernameInput: '',
                passwordInput: '',
                loggedInUser:  null,
            }) 
            this.props.sendIt(null);
        })

    }

    fetchUser(){
        if( this.state.loggedInUser === null ){  
            axios.get(`http://localhost:5000/api/loggedin`, {withCredentials: true})
            .then((response)=>{
                this.setState({
                    usernameInput: this.state.usernameInput,
                    passwordInput: this.state.passwordInput,
                    loggedInUser:  response.data,
               }) 
               this.props.sendIt(response.data)
            })
            .catch((err)=>{
                this.setState({
                    usernameInput: this.state.usernameInput,
                    passwordInput: this.state.passwordInput,
                    loggedInUser:  false,
               }) 
            })
        }
    }


  

    showForm(){
        if(true){
            return (
            <div>
             <label> Username </label>
            <input value = {this.state.usernameInput} onChange={(e)=>{this.updateUsername(e)}} type="text"/>
            <label> Password </label>
            <input value = {this.state.passwordInput} onChange={(e)=>{this.updatePassword(e)}} type="password"/>
            
            <button  onClick={()=>{this.login()}} className="little-green-btn" > Log In </button>
            <button onClick={()=>{this.signup()}} className="little-green-btn" > Create New Account </button> 
           </div>
            )
        }
    }

    

    render(){
        return(
            <div>
             {/* {this.showUser()} */}
             {this.showForm()}
            </div>
            )
    }
}


export default User;