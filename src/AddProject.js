import React, { Component } from 'react';
import axios from 'axios';



class AddProject extends Component {
    constructor(props){
        super(props)
        this.state = {
            titleInput: '',
            descInput: '',
        }
    }

    addProject(){

        axios.post("http://localhost:5000/api/projects/create",{title: this.state.titleInput,description: this.state.descInput}, {withCredentials: true})
        .then((res)=>{
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
      <div className="add-project">

        <h3> Add a New Project </h3>

        <label> Title </label>
        <input value={this.state.titleInput} onChange={(e)=>{this.updateTitle(e)}} type="text"/> 
  
        <label> Description </label>
        <textarea rows="10" cols="25" value={this.state.descInput}  onChange={(e)=>{this.updateDescription(e)}} type="text"/> 
        
  
        <button className="grn-btn" onClick={()=>{this.addProject()}} > Submit New Project </button>
  
      </div>
      )
    }
  
  }

  export default AddProject