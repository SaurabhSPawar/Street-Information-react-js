const initialState = {
    name   : '',
    imgUrl : ''
};

const changeTheUserState = ( state = initialState, action ) => {
    switch ( action.type ) {
        case "UPDATE_DETAILS" : return  action.payloads;
        default : return state;
    }
}

export default changeTheUserState;