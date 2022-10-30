export const saveOrderDetails = (order) => {
    return {
        type: "SAVE_ORDER_DETAILS",
        payload: order
    }
}

export const addToCart = (pro, qty) => {
    return {
        type: "ADD_TO_CART",
        payload: { ...pro, qty }
    }
}
export const finishOrder = () => {
    return {
        type: "FINISH_ORDER"
    }
}
