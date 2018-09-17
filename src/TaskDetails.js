import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';





class TaskDetails extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/projects/'+this.props.match.params.id+"/tasks/"+this.props.match.params.taskID)
        .then((theTask)=>{
            const t = theTask.data
            this.setState(t)
        })
        .catch((err)=>{
            console.log(err)
        })
    }





    render(){
      
        return(

    <div>
            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>

    </div>
        )
    }
}





export default TaskDetails;








