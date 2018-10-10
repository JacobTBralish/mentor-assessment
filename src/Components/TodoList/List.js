import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './List.css';
import { connect } from 'react-redux';
import { getTasks, markCompleted, deleteTask } from '../../Redux/reducer';


class List extends Component {
    state = {  }

    componentDidMount() {
        this.props.getTasks();
    }

    deleteATask = (id) => {
        this.props.deleteTask(id);
        this.props.history.push('/');
    }

    markAsCompleted=(id)=>{
        this.props.markCompleted(id);
        this.props.history.push('/');
    }
    
    render() { 
        let { tasks } = this.props;

        let mappedTasks = tasks ? tasks.map((task, index) => {
            
            return <div key={index} className='task'>
                <Link className='taskTitle' to={`/detailedView/${task.id}`}><h4>{task.title}</h4></Link>
                <div className='taskButtons'>
                {task.completed ?
                    <button className='completedButtonDone'>Completed</button>
                    :
                    <button className='completedButton' onClick={() => {this.markAsCompleted(task.id)}}>Completed</button>
                }
                    <button className='deleteButton' onClick={() => {this.deleteATask(task.id)}}>X</button>
                </div>
            </div>
        }) : 'Loading...'
        return ( 
            <div className='list'>
                    {mappedTasks}
                    <div>
                        {/* <DetailedView /> */}
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
    getTasks,
    markCompleted,
    deleteTask
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));