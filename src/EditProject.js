import React, { Component } from 'react';
import axios from 'axios';



class EditProject extends Component {
    constructor(props){
        super(props)
        this.state = {
            titleInput: this.props.title,
            descInput: this.props.desc,
            theTasks: this.props.theTasks,
        }
    }

    submitChanges(){
        axios.post(`http://localhost:5000/api/projects/edit/${this.props.projectProp}`,
         {title: this.state.titleInput, description: this.state.descInput},
         {withCredentials: true})
        .then((res)=>{
            this.setState({titleInput:'', descInput: ''})
            this.props.blah()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    updateTitle(e){
        this.setState({
            ...this.state,
            titleInput: e.target.value,
        })

    }

    updateDescription(e){
        this.setState({...this.state, descInput: e.target.value})
    }


    renderEachTask(){
        return(
            this.state.theTasks.map((eachTask, index) => {
               return( 
               <li className="each-task-in-edit-form" key={index}>
                <h5>{eachTask.title}</h5>
                <p>Status: {eachTask.doneYet? 'Complete' : 'Incomplete'}</p>
                </li>
               )
            })
        )
    }

    


    render(){
        return(
        <div className="edit-project">
        <h3> Edit This Project </h3>
        <label> Title </label>
        <input value={this.state.titleInput} onChange={(e)=>{this.updateTitle(e)}}  type="text"/> 
  
        <label> Description </label>
        <textarea value={this.state.descInput}  onChange={(e)=>{this.updateDescription(e)}}  type="text" rows="4"/> 
  
        <h4>Tasks</h4>
        <ul>
            {this.renderEachTask()}
        </ul>


        <button className="little-green-btn" onClick={()=>this.submitChanges()}> Save Changes </button>
  
        </div>
        )
    }





}

export default EditProject;
