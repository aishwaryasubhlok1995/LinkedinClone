
const initialStore = {
    authFlag : false,
    username:"",
    firstname:"",
    location:false,
    inserted:false,
    details:false
}

const reducer = (state = initialStore,action) => {
    if(action.type === "LOGIN" && action.statusCode == 200){
        return {
            ...state,
            authFlag : true,
            username:action.payload.username,
            firstname:action.payload.firstname
        }
    }
    if(action.type === "LOGIN" && action.status == 401){
        return {
            ...state,
            authFlag : false
        }
    }   
    if(action.type === "LOCDATA" && action.statusCode == 200){
        return {
            ...state,
            location : true
        }
    } 
    if(action.type === "DETAILS" && action.statusCode == 200){
        return {
            ...state,
            details : true
        }
    }   
    if(action.type === "SIGNUP" && action.statusCode == 200){
        return {
            ...state,
            inserted : true,
            firstname:action.payload.firstname,
            username:action.payload.username
        }
    }
    if(action.type === "SIGNUP" && action.status == 400){
        return {
            ...state,
            inserted : false
        }
    } 
    return state;
}

export default reducer;