const initialStore = {
   Property:[]
}

const reducer = (state = initialStore,action) => {
  
    if(action.type === "Search" && action.statusCode == 200){
      //  console.log(action.payload)
        return {
            ...state,
            Property:(action.payload),
            Search:true,
            getProperty:false
            
        }
    }
    
    return state;
}

export default reducer;