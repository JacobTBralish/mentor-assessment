import React, { Component } from 'react';
import { editTask, deleteTask, markCompleted } from '../../Redux/reducer';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './DetailedView.css';


class DetailedView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            description: '',
            task: ''
         }
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

    // handleCancel = () => {
    //     // let previous = this.props.tasks[0] 
    //     console.log('previous: ', previous);
    //     this.setState({
    //         task:previous[0].title,
    //         description: previous[0].description
    //     })

    // }

    render() { 
        let { task, description } = this.state;
        let { tasks } = this.props;
        console.log('tasks: ', tasks);
        

        return ( 
            <div className='detailedView'>
                <div className='editBox'>
                <Link className='backLink' to='/'><i className="fas fa-chevron-left"></i> Back to Tasks</Link>
                <div className='titleCluster'>
                        <label>Title</label>
                        <input value={task} name='task' /* placeHolder={this.props.tasks[0].title} */ className='detailedTaskInput'  onChange={this.handleChange}></input>
                        {task.completed ?
                        <button className='detailedCompletedButtonDone'>Completed</button>
                        :
                        <button className='detailedCompletedButton' onClick={() => {markCompleted(this.props.match.params.id)}}>Completed</button>
                        }
                </div>
                    <label>Description</label>
                    <input type='text' value={description} name='description' className='detailedDescriptionInput' onChange={this.handleChange}></input>
                    <div className='buttonCluster'>
                        <button className='detailedPostButton' onClick={()=> { this.handleDetailedPost(this.props.match.params.id, task, description)}}>Save</button>
                        <Link id='detailedCancelButton' to='/'>Cancel</Link>
                        <button className='detailedDeleteButton' onClick={()=> { deleteTask(this.props.match.params.id)}}>Delete</button>
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
    markCompleted
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedView));