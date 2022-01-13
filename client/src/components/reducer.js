export const initialState = {
    basket: [],
    studentInfo: [],
    basketOnePayment: [],
    basketSubscriptionMonth: [],
}

export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0) // reduce loops through the basket and then tally ups the total

export const getBasketOnePayTotal = (basketOnePayment) => {
    basketOnePayment?.reduce((amount, item) => item.price + amount, 0)
}

export const getBasketSubscriptionTotal = (basketSubscriptionMonth) => {
    basketSubscriptionMonth?.reduce((amount, item) => item.price + amount, 0)
}

const reducer = (state, action) => {
    console.log(action)
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
                basketOnePayment: state.basket.filter(item => item.paymentType === 'onePayment'),
                basketSubscriptionMonth: state.basket.filter(item => item.paymentType === 'subscription'),
            }

        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id),
                basketOnePayment: state.basketOnePayment.filter(item => item.id !== action.id),
                basketSubscriptionMonth: state.basketSubscriptionMonth.filter(item => item.id !== action.id),
            }
        
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [],
                basketOnePayment: [],
                basketSubscriptionMonth: [],
            }

        case 'SET_STUDENT_INFO':
            const index = state.studentInfo.findIndex(info => info.id === action.id);
            let newInfo = [...state.studentInfo];
            let infoStudent = action.info;
            if(index >= 0){
                newInfo.splice(index, 1, infoStudent)
            } else {
                return {
                    ...state,
                    studentInfo: [...state.studentInfo, action.info]
                }
            }
            return {
                ...state,
                studentInfo: newInfo
            }

        default:
            return state;
    }
}

export default reducer;