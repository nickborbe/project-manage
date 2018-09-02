import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AddProject from './AddProject';
import EditProject from './EditProject'



class ProjectList extends Component {
  constructor(props){
    super(props)
    this.state = {
      theProjects: null,
      showing: false,
      loggedInUser: this.props.theActualUser,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["theActualUser"]})
    console.log('re rendering to do list component', this.state)
  }



  getAllTheProjects(){
    axios.get("http://localhost:5000/api/projects", {withCredentials: true})
    .then((allTheProjects)=>{
      this.setState({theProjects: allTheProjects.data, showing: false, loggedInUser: this.state.loggedInUser})
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  toggleEditForm(whichProject){
    if(this.state.showing === whichProject){
      this.setState({theProjects: this.state.theProjects, showing: false});
    } else{
      this.setState({theProjects: this.state.theProjects, showing: whichProject});
    }
  }

  renderForm(theIndex, theProjectID, theTitle, theDesc){
    if(this.state.showing === theIndex){
        return(
          <EditProject blah={()=>this.getAllTheProjects()} ProjectProp={theProjectID} title={theTitle} desc={theDesc}></EditProject>
      )
    }
  }

    deleteProject(theIdOfTheProject){
      axios.post(`http://localhost:5000/api/projects/delete/${theIdOfTheProject}`, {}, {withCredentials: true})
      .then((response)=>{
        console.log(response);
        this.getAllTheProjects();
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    seeIfProjectBelongsToUser(project, index){
      if(this.state.loggedInUser && project.owner == this.state.loggedInUser._id){
        return (
          <div>
          <button onClick={()=>{this.deleteProject(project._id)}} style={{float:'right', backgroundColor: 'red', padding: '10px', margin: '0 5px'}}>
          Delete Project
          </button>
        <button onClick={()=>this.toggleEditForm(index)} style={{float:'right', backgroundColor: 'greenyellow', padding: '10px',  margin: '0 5px'}}> 
        Edit This Project 
        </button>
        </div>
        )
      } 
    }



  showProjects(){
    if(this.state.theProjects === null){
      this.getAllTheProjects();
    }

    if(this.state.theProjects){

      return (
        this.state.theProjects.map((project, index) => {
          return(
        <div key={index}>
          {this.seeIfProjectBelongsToUser(project, index)}
        <h3>{project.title}</h3>
        <p style={{maxWidth: '400px'}} >{project.description} </p>
        {this.renderForm(index, project._id, project.title, project.description)}

      
        </div>
          ) 
        })
      )
    } // closes the if statement
  }


  render() {
    return (
   <div>
        <h1> The Single Greatest Project Management App in the History of Human History </h1>
      <div className="App">
        
          <div className="list">
          <h2> My Projects </h2>
            {this.showProjects()}
          </div>

          
        <div className="add">
        <AddProject blah={()=>this.getAllTheProjects()}></AddProject>
        </div>



      </div>
  </div>
    );
  }
}







export default ProjectList;
