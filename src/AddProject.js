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

        axios.post("http://localhost:5000/api/tasks/create",{title: this.state.titleInput,description: this.state.descInput}, {withCredentials: true})
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
            titleInput: e.target.value,
            descInput: this.state.descInput
        })

    }

    updateDescription(e){
        this.setState({
            titleInput: this.state.titleInput,
            descInput: e.target.value,
        })
    }


    render(){
      return(
      <div className="add-task">

        <h3> Add a New Task </h3>

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