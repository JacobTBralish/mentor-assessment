import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postTask } from '../../Redux/reducer';
import { withRouter } from 'react-router-dom';
import './TodoInput.css';

class TodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: ''
         }
    }

    handleChange=(event)=>{
        this.setState({
            title: event.target.value
        })
    }

    clearTitle= () => {
        this.setState({
            title: ''
        })
    }

    postNewTask = (title) => {
        this.props.postTask(title);
        this.clearTitle();
        this.props.history.push('/');
    }

    render() { 
        let { title } = this.state;

        //In-line style
        let style = {
            fontSize: '30px',
            fontWeight: 'bold'
        }

        return ( 
            <div className='inputBox'>
                <label style={style} className='titleLabel'>To-Do:</label>
                <input className='titleInput' value={title} maxLength={60} onChange={this.handleChange} type='text'></input>
                <button className='addButton' onClick={() => {this.postNewTask(title)}}>Add to list</button>
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
    postTask
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoInput));