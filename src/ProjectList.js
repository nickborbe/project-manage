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
      addingWhat: false,
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
      this.setState({...this.state, theProjects: allTheProjects.data, showing: false})
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  toggleEditForm(whichProject){
    if(this.state.showing === whichProject){
      this.setState({theProjects: this.state.theProjects, showing: false});
    } else{
      this.setState({...this.state, showing: whichProject});
    }
  }

  toggleAddForm(whichProject){
    if(this.state.addingWhat === false){
      this.setState({...this.state, addingWhat: whichProject});
    } else{
      this.setState({...this.state, addingWhat: false});
    }

  }

  renderForm(theIndex, theProjectID, theTitle, theDesc, theTasks){
    if(this.state.showing === theIndex){
        return(
          <EditProject blah={()=>this.getAllTheProjects()} projectProp={theProjectID} title={theTitle} desc={theDesc} theTasks={theTasks}></EditProject>
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
        <button className="little-green-btn">See Details</button>
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
        <div className="singleProjectInList" key={index}>
        <h3>{project.title}</h3>
        <p style={{maxWidth: '400px'}} >{project.description} </p>
          {this.seeIfProjectBelongsToUser(project, index)}
        {this.renderForm(index, project._id, project.title, project.description, project.tasks)}

      
        </div>
          ) 
        })
      )
    } // closes the if statement
  }

    chooseWhichAddFormToShow(){
      return(
        <AddProject blah={()=>this.getAllTheProjects()}></AddProject>
      )
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
        {this.chooseWhichAddFormToShow()}
        </div>



      </div>
  </div>
    );
  }
}







export default ProjectList;
