//שמירת משתמש
//או כשהשרת החזיר תשובה אחרי כניסה שהצליחה
//או שהשרת החזיר תשובה אחרי הרשמה שהצליחה

//יציאת משתמש
export const saveUser = (user) => {
    return {
        type: "SAVE_USER",
        payload: user
    }
}
export const exitUser = () => {
    return {
        type: "EXIT_USER",
        payload: null
    }
}