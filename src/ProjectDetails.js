import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';





class ProjectDetails extends Component {
    constructor(props){
        super(props)
        this.state = {tasks: []}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/projects/'+this.props.match.params.id)
        .then((theProject)=>{
            const p = theProject.data
            this.setState(p)
        })
        .catch((err)=>{
            console.log(err)
        })
    }





    render(){
        
        return(


            <div className="projectDetails">
                <h1>{this.state.title}</h1>
                <h3>{this.state.description}</h3>
                <hr />

                <br />
                <br />


            {this.state.tasks.length > 0 && <h2>Tasks </h2>}
            {this.state.tasks.map((task, index) => {
                const theURL = "/oneProject/"+this.state._id+"/oneTask/"+task._id
          return(
        <div className="singleProjectInList" key={index}>
        <h3>
            <Link to={theURL} > {task.title} </Link>
       
        </h3>
        <p  >{task.description} </p>
     


      
        </div>
          ) 
        })}



            </div>
        )
    }
}





export default ProjectDetails;








