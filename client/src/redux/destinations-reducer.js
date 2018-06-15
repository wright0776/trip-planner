import axios from 'axios';

let destinationsAxios = axios.create();

destinationsAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})


const LOADING = 'LOADING';
const ERR_MSG = 'ERR_MSG';
const GET_DESTINATIONS = 'GET_DESTINATIONS';
const GET_ONE_DESTINATION = 'GET_ONE_DESTINATION';
const ADD_DESTINATION = 'ADD_DESTINATION';
export const EDIT_DESTINATION = 'EDIT_DESTINATION';
const DELETE_DESTINATION = 'DELETE_DESTINATION';
const LOGOUT = 'LOGOUT';

const destinationsURL = "/api/destinations/";

const initialState = {
    data: [],
    currentDestination: {},
    loading: true,
    errMsg: ""
}


/////////////////////
// Action Creators //
/////////////////////
export const getDestinations = () => {
    return dispatch => {
        destinationsAxios.get(destinationsURL)
            .then(response => {
                dispatch({
                    type: GET_DESTINATIONS,
                    data: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `GET: ${err}`
                })
            })
    }
}

export const getOneDestination = (id) => {
    return dispatch => {
        destinationsAxios.get(destinationsURL + id)
            .then(response => {
                dispatch({
                    type: GET_ONE_DESTINATION,
                    data: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `GET ONE: ${err}`
                })
            })
    }
}

export const addDestination = (newDestination) => {
    return dispatch => {
        destinationsAxios.post(destinationsURL, newDestination)
            .then(response => {
                dispatch({
                    type: ADD_DESTINATION,
                    newDestination: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `POST: ${err}`
                })
            })
    }
}

export const deleteDestination = (id) => {
    return dispatch => {
        destinationsAxios.delete(destinationsURL + id)
            .then(response => {
                dispatch({
                    type: DELETE_DESTINATION,
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `DELETE: ${err}`
                })
            })
    }
}

export const editDestination = (editedDestination, id) => {
    return dispatch => {
        let url = destinationsURL + id;
        destinationsAxios.put(url, editedDestination)
            .then(response => {
                dispatch({
                    type: EDIT_DESTINATION,
                    editedDestination: response.data,
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: ERR_MSG,
                    errMsg: `PUT: ${err}`
                })
            })
    }
}

/////////////
// Reducer //
/////////////
const destinationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case ERR_MSG:
            return {
                ...state,
                loading: false,
                errMsg: action.errMsg
            }
        case GET_DESTINATIONS:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case GET_ONE_DESTINATION:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case ADD_DESTINATION:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.newDestination],
                currentDestination: action.newDestination
            }
        case EDIT_DESTINATION:
            return {
                ...state,
                loading: false,
                data: state.data.map(destination => {
                    if (destination._id === action.id) {
                        return action.editedDestination;
                    } else return destination;
                })
            }
        case DELETE_DESTINATION:
            return {
                ...state,
                loading: false,
                data: state.data.filter(destination => destination._id !== action.id)
            }
        case LOGOUT:
            return {
                ...initialState,
                loading: false
            }
        default:
            return state;
    }
}

export default destinationsReducer;