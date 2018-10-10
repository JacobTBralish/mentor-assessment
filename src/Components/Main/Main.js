import React, { Component } from 'react';
import TodoInput from '../TodoInput/TodoInput';
import './Main.css';
import List from '../TodoList/List';


export default class Main extends Component {
    render() { 
        return ( 
            <div className='main'>
                <TodoInput />
                <List />
            </div>
         );
    }
}