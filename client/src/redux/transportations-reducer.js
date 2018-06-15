import axios from 'axios';
import { EDIT_DESTINATION } from './destinations-reducer';

let transportationsAxios = axios.create();

transportationsAxios.interceptors.request.use((config)=>{  
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const LOADING = 'LOADING';
const ERR_MSG = 'ERR_MSG';
const GET_TRANSPORTATIONS = 'GET_TRANSPORTATIONS';
const GET_ONE_TRANSPORTATION = 'GET_ONE_TRANSPORTATION';
const ADD_TRANSPORTATION = 'ADD_TRANSPORTATION';
const EDIT_TRANSPORTATION = 'EDIT_TRANSPORTATION';
const DELETE_TRANSPORTATION = 'DELETE_TRANSPORTATION';
const LOGOUT = 'LOGOUT';

const transportationsURL = "/api/transportations/";

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}


/////////////////////
// Action Creators //
/////////////////////
export const getTransportation = () => {
    return dispatch => {
        transportationsAxios.get(transportationsURL)
            .then(response => {
                dispatch({
                    type: GET_TRANSPORTATIONS,
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

export const getOneTransportation = (id) => {
    return dispatch => {
        transportationsAxios.get(transportationsURL + id)
            .then(response => {
                dispatch({
                    type: GET_ONE_TRANSPORTATION,
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

export const addTransportation = (newTransportation, destID) => {
    return dispatch => {
        transportationsAxios.post(transportationsURL, newTransportation)
            .then(response => {
                dispatch({
                    type: ADD_TRANSPORTATION,
                    newTransportation: response.data
                })
                const transID = response.data._id;
                return transID;
            })
            .then(transID => {
                let editedDestination = { transportations: transID };
                return transportationsAxios.post(`/api/destinations/${destID}/add-transportation`, editedDestination)   
            })
            .then(response => {
                dispatch({
                    type: EDIT_DESTINATION,
                    editedDestination: response.data,
                    destID
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

export const deleteTransportation = (id) => {
    return dispatch => {
        transportationsAxios.delete(transportationsURL + id)
            .then(response => {
                dispatch({
                    type: DELETE_TRANSPORTATION,
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

export const editTransportation = (editedTransportation, id) => {
    return dispatch => {
        let url = transportationsURL + id;
        transportationsAxios.put(url, editedTransportation)
            .then(response => {
                dispatch({
                    type: EDIT_TRANSPORTATION,
                    editedTransportation: response.data,
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
const transportationsReducer = (state = initialState, action) => {
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
        case GET_TRANSPORTATIONS:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case GET_ONE_TRANSPORTATION:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case ADD_TRANSPORTATION:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.newTransportation]
            }
        case EDIT_TRANSPORTATION:
            return {
                ...state,
                loading: false,
                data: state.data.map(transportation => {
                    if (transportation._id === action.id) {
                        return action.editedTransportation;
                    } else return transportation;
                })
            }
        case DELETE_TRANSPORTATION:
            return {
                ...state,
                loading: false,
                data: state.data.filter(transportation => transportation._id !== action.id)
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

export default transportationsReducer;