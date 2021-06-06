import { combineReducers } from "redux";

function getUser(state = [], action) {

    switch (action.type) {
        case "SET_USER":
            // console.log(action.payload, "Payload")
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

function getAllUsers(state = [], action) {

    switch (action.type) {
        case "SET_ALL_USERS":
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    getUser,
    getAllUsers
});

export default rootReducer;