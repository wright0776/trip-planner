import axios from 'axios';
import { EDIT_DESTINATION } from './destinations-reducer';

let reservationsAxios = axios.create();

reservationsAxios.interceptors.request.use((config)=>{  
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const LOADING = 'LOADING';
const ERR_MSG = 'ERR_MSG';
const GET_RESERVATIONS = 'GET_RESERVATIONS';
const GET_ONE_RESERVATION = 'GET_ONE_RESERVATION';
const ADD_RESERVATION = 'ADD_RESERVATION';
const EDIT_RESERVATION = 'EDIT_RESERVATION';
const DELETE_RESERVATION = 'DELETE_RESERVATION';
const LOGOUT = 'LOGOUT';

const reservationsURL = "/api/reservations/";

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}


/////////////////////
// Action Creators //
/////////////////////
export const getReservations = () => {
    return dispatch => {
        reservationsAxios.get(reservationsURL)
            .then(response => {
                dispatch({
                    type: GET_RESERVATIONS,
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

export const getOneReservation = (id) => {
    return dispatch => {
        reservationsAxios.get(reservationsURL + id)
            .then(response => {
                dispatch({
                    type: GET_ONE_RESERVATION,
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

export const addReservation = (newReservation, destID) => {
    return dispatch => {
        reservationsAxios.post(reservationsURL, newReservation)
            .then(response => {
                dispatch({
                    type: 'ADD_RESERVATION',
                    newReservation: response.data
                })
                const resID = response.data._id;
                return resID;
            })
            .then(resID => {
                let editedDestination = { reservations: resID };
                return reservationsAxios.post(`/api/destinations/${destID}/add-reservation`, editedDestination)
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

export const deleteReservation = (id) => {
    return dispatch => {
        reservationsAxios.delete(reservationsURL + id)
            .then(response => {
                dispatch({
                    type: 'DELETE_RESERVATION',
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

export const editReservation = (editedReservation, id) => {
    return dispatch => {
        let url = reservationsURL + id;
        reservationsAxios.put(url, editedReservation)
            .then(response => {
                dispatch({
                    type: 'EDIT_RESERVATION',
                    editedReservation: response.data,
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
const reservationsReducer = (state = initialState, action) => {
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
        case GET_RESERVATIONS:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case GET_ONE_RESERVATION:
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case ADD_RESERVATION:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.newReservation]
            }
        case EDIT_RESERVATION:
            return {
                ...state,
                loading: false,
                data: state.data.map(reservation => {
                    if (reservation._id === action.id) {
                        return action.editedReservation;
                    } else return reservation;
                })
            }
        case DELETE_RESERVATION:
            return {
                ...state,
                loading: false,
                data: state.data.filter(reservation => reservation._id !== action.id)
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

export default reservationsReducer;