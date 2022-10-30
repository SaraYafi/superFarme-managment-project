
const initialState = {
    productsArr: []
}
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {
                ...state,
                productsArr: [...state.productsArr, action.payload]
            }
            case "CHANGE_QTY":
                {
                    let arr=state.productsArr;
                    let p = arr.findIndex(item => item.name== action.payload.name);
                    arr[p].qty=action.payload.qty;  
                return {
                    ...state,
                    cart: [...arr]
                }
            }
        case "DELETE_PRODUCT":
            let a = state.productsArr.filter(item => item.id != action.payload);
            return {
                ...state,
                productsArr: a
            }
        case "SAVE_PRODUCTS":
            return {
                ...state,
                productsArr: action.payload
            }
        default:
         return state;

    }
    
}