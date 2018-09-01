import React, { Component } from 'react';
import axios from 'axios';



class EditTask extends Component {
    constructor(props){
        super(props)
        this.state = {
            titleInput: this.props.title,
            descInput: this.props.desc,
        }
    }

    submitChanges(){
        axios.post(`http://localhost:5000/api/tasks/edit/${this.props.taskProp}`,
         {title: this.state.titleInput, description: this.state.descInput},
         {withCredentials: true})
        .then((res)=>{
            console.log(res)
            this.setState({titleInput:'', descInput: ''})
            this.props.blah()
        })
        .catch((err)=>{
            console.log(err)
        })
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
        <div className="edit-task">
        <h3> Edit This Task </h3>
        <label> Title </label>
        <input value={this.state.titleInput} onChange={(e)=>{this.updateTitle(e)}}  type="text"/> 
  
        <label> Description </label>
        <input value={this.state.descInput}  onChange={(e)=>{this.updateDescription(e)}}  type="text"/> 
  
        <button onClick={()=>this.submitChanges()}> Save Changes </button>
  
        </div>
        )
    }





}

export default EditTask;
