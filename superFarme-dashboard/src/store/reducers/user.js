const initialState = {
     currnetUser: null
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_USER":
            return {
                ...state,
                currnetUser:  action.payload
            }
        case "EXIT_USER":
            return {
                ...state,
                currnetUser:null
            }
        default:
         return state;

    }
    
}