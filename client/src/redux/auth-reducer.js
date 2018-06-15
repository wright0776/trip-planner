import axios from "axios";

const profileAxios = axios.create();
profileAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const AUTHENTICATE = 'AUTHENTICATE';
const LOGOUT = 'LOGOUT';
const STOP_LOADING = 'STOP_LOADING';
const AUTH_ERROR = 'AUTH_ERROR';
const ERASE_ERROR = 'ERASE_ERROR';

const signupURL = "/auth/signup/";
const loginURL = "/auth/login/";
const profileURL = "/api/profile/";




/////////////////////
// Action Creators //
/////////////////////
function authenticate(user) {
    return {
        type: AUTHENTICATE,
        user
    }
}

function authError(key, errCode) {
    return {
        type: AUTH_ERROR,
        key,
        errCode
    }
}

export const signup = (userInfo) => {
    // make post request with user info, and store the token and user data that comes back
    return dispatch => {
        axios.post(signupURL, userInfo)
            .then(response => {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(authenticate(user));
            })
            .catch((err) => {
                console.error(err);
                dispatch(authError("signup", err.response.status));
            })
    }
}

export const login = (credentials) => {
    return dispatch => {
        axios.post(loginURL, credentials)
            .then(response => {
                const { token, user } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch(authenticate(user));
            })
            .catch((err) => {
                console.error(err);
                dispatch(authError("login", err.response.status));
            })
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
        type: LOGOUT
    }
}

export function verify() {
    return dispatch => {
        profileAxios.get(profileURL)
            .then(response => {
                let { user } = response.data;
                
                dispatch(authenticate(user));
            })
            .catch(err => {
                dispatch(authError("verify", err.response.status));
            });
    }
}

export function eraseError() {
    return {
        type: ERASE_ERROR
    }
}

const initialState = {
    loading: true,
    username: "",
    isAdmin: false,
    isAuthenticated: false,
    authErrCode: {
        signup: "",
        login: "",
        verify: ""
    },
}

/////////////
// Reducer //
/////////////
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case STOP_LOADING:
            return {
                ...state,
                loading: false
            };
        case AUTH_ERROR:
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode
                },
                loading: false
            };
        case ERASE_ERROR:
            return {
                ...state,
                authErrCode: initialState.authErrCode
            }
        case AUTHENTICATE:
            return {
                ...state,
                ...action.user,
                isAuthenticated: true,
                loading: false,
                authErrCode: initialState.authErrCode
            };
        case LOGOUT:
            return {
                ...initialState,
                loading: false
            };
        default:
            return state;
    }
}

export default authReducer;