import { types } from "../types/types";


export const setError = (errr) =>({

    type: types.uiSetError,
    payload: errr
});

export const removeError = () =>({
    
    type: types.uiRemoveError

});

export const setLoading = () =>({

    type: types.uiStartLoading 
})

export const removeLoading = () =>({
    type: types.uiFinishLoading
})
