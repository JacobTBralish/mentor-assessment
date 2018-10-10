import React, { Component } from 'react';
import { editTask, deleteTask, markCompleted, getTask } from '../../Redux/reducer';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './DetailedView.css';


class DetailedView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            description: '',
            task: '',
            id: '',
            completed: null
         }
    }

    componentDidMount() {
        this.props.getTask(this.props.match.params.id).then(response=>{
            let chosenTask = response.value[0]
            this.setState({
                task: chosenTask.title,
                id: chosenTask.id,
                description: chosenTask.description,
                completed: chosenTask.completed
            })
        })
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleDetailedPost = (id, title, description) => {
        this.props.editTask(id, title, description);
        this.props.history.push('/');
    }

    markAsCompleted=(id)=>{
        this.props.markCompleted(id);
        this.props.history.push(`/`)
    }

    deleteTheTask=(id)=>{
        this.props.deleteTask(id);
        this.props.history.push('/');
    }

    render() { 
        let { task, description, completed, id } = this.state;
        let { tasks } = this.props;

        
        // let filteredTasks = tasks.filter((e) => {
        //     
        //     return e.id === tasks.id
        // })

        let mappedTasks = tasks ? tasks.map((task, index) => {
            
            return <div key={index}></div>
        }) : 'loading...'
        
        
        return ( 
            <div className='detailedView'>
                {mappedTasks}
                <div className='editBox'>
                <Link className='backLink' to='/'><i className="fas fa-chevron-left"></i> Back to Tasks</Link>
                <div className='titleCluster'>
                        <h4><label>Title</label></h4>
                        <input value={task} name='task' maxLength={60} className='detailedTaskInput' onChange={this.handleChange}></input>
                        {completed ? 
                        <button className='detailedCompletedButtonDone'>Completed</button>
                        : 
                        <button className='detailedCompletedButton' onClick={() => {this.markAsCompleted(this.props.match.params.id)}}>Completed</button>
                        }
                </div>
                    <h4>Description</h4>
                    <textarea type='text' value={description} name='description' className='detailedDescriptionInput' onChange={this.handleChange}></textarea>
                    <div className='buttonCluster'>
                        <button className='detailedPostButton' onClick={()=> { this.handleDetailedPost(this.props.match.params.id, task, description)}}>Save</button>
                        <Link id='detailedCancelButton' to='/'>Cancel</Link>
                        <button className='detailedDeleteButton' onClick={()=> {this.deleteTheTask(this.props.match.params.id)}}>Delete</button>
                    </div>
                </div>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks
    }
}

const mapDispatchToProps = {
    editTask,
    deleteTask,
    markCompleted,
    getTask
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedView));