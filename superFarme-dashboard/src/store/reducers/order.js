const initialState = {
    cart: [],
    details: {
        name: null,
        orderDate: null,
        destDate: null,
        userId: null,
        city: null,
        street:null,
        numHouse:null
    }
}
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            {
                 let cart=state.cart;
                 if(action.payload.qty==0){
                    let cart = state.cart.filter(item => item.name!= action.payload.name);
                    return {
                        ...state,
                        cart: [...cart]
                    }
                 }
            let p = state.cart.findIndex(item => item.name== action.payload.name);
             if(p!=-1){ 
                cart[p]=action.payload;
                return {
                    ...state,
                    cart: [...cart]
                }
             }
                
            return {
                ...state,
                cart: [...cart,action.payload]
            }
        }
        case "SAVE_ORDER_DETAILS":
            return {
                ...state,
                details: action.payload
            }
        case "FINISH_ORDER":
            return {
                cart:[],
                details:{
                    name: null,
                    orderDate: null,
                    destDate: null,
                    userId: null,
                    address: null
                }

            }
        default: return state;
    }
}