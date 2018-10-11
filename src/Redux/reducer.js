import axios from 'axios';

const initialState = {
    tasks: [],

}

const GET_TASKS = 'GET_TASKS'
const GET_TASK = 'GET_TASK'
const POST_TASK = 'POST_TASK'
const EDIT_TASK = 'EDIT_TASK'
const DELETE_TASK = 'DELETE_TASK'
const MARK_COMPLETE = 'MARK_COMPLETE'



export default function reducer( state = initialState, action) {
    switch(action.type){
        case GET_TASKS + `_FULFILLED`:
            return {...state, tasks: action.payload}
        case GET_TASK + `_FULFILLED`:
            return {...state, tasks: action.payload}
        case POST_TASK + `_FULFILLED`:
            return {...state, tasks: action.payload}
        case EDIT_TASK + `_FULFILLED`:
            return {...state, tasks: action.payload}
        case DELETE_TASK + `_FULFILLED`:
            return {...state, tasks: action.payload}
        case MARK_COMPLETE + `_FULFILLED`:
            return {...state, tasks: action.payload}
        default:
        return state
    }
}

export function getTasks(){
    return {
        type: GET_TASKS,
        payload: axios.get('https://practiceapi.devmountain.com/api/tasks').then(response => {
            return response.data
        })
    }
}

export function getTask(id){
    let tasks = axios.get('https://practiceapi.devmountain.com/api/tasks').then(response => {
        return response.data.filter(task => task.id == id)
    })
    return {
        type: GET_TASK,
        payload: tasks
    }
}

export function postTask(title){
    return {
        type: POST_TASK,
        payload: axios.post('https://practiceapi.devmountain.com/api/tasks', {title: title}).then(response => {
            
            
            return response.data
        })
    }
}

export function editTask(id, title, description){
    return {
        type: EDIT_TASK,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, {title: title, description: description}).then(response => {
            return response.data
        })
    }
}

export function deleteTask(id){
    return {
        type: DELETE_TASK,
        payload: axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(response => {
            return response.data
        })
    }
}

export function markCompleted(id){
    return {
        type: MARK_COMPLETE,
        payload: axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(response => {
            return response.data
        })
    }
}

