export const addProduct = (prod) => {
    return {
        type: "ADD_PRODUCT",
        payload: prod
    }
}
export const deleteProduct = (prodId) => {
    return {
        type: "DELETE_PRODUCT",
        payload: prodId
    }
}
export const saveProducts = (prodArr) => {
    return {
        type: "SAVE_PRODUCTS",
        payload: prodArr
    }
}
export const changeQty=(prod,q)=>{
    return{
        type:"CHANGE_QTY",
        payload:{...prod, q}
    }
}