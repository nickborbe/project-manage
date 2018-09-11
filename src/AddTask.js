import React, { Component } from 'react';
import axios from 'axios';



class AddTask extends Component {
    constructor(props){
        super(props)
        this.state = {
            titleInput: '',
            descInput: '',
        }
    }

    addTask(){
        const title = this.state.titleInput;
        const description = this.state.descInput;
        const projectID = this.props.theProject;

        axios.post("http://localhost:5000/api/tasks/create",{title, description, projectID}, {withCredentials: true})
        .then((res)=>{
            console.log(res)
            this.props.blah();
        })
        .catch((err)=>{
            console.log(err);
        })

        this.setState({titleInput: '', descInput:''});
    }

    updateTitle(e){
        this.setState({
            ...this.state,
            titleInput: e.target.value,
        })

    }

    updateDescription(e){
        this.setState({
            ...this.state,
            descInput: e.target.value,
        })
    }


    render(){
      return(
      <div className="add-task">

        <h3> Add a New Task To This Project </h3>

        <label> Title </label>
        <input value={this.state.titleInput} onChange={(e)=>{this.updateTitle(e)}} type="text"/> 
  
        <label> Description </label>
        <textarea rows="10" cols="25" value={this.state.descInput}  onChange={(e)=>{this.updateDescription(e)}} type="text"/> 
        
  
        <button className="grn-btn" onClick={()=>{this.addTask()}} > Submit New Task </button>
  
      </div>
      )
    }
  
  }

  export default AddTask