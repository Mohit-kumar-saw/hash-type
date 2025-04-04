const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    value: false,
}

const slice= createSlice({
    name: "reanimate",
    initialState,
    reducers :{
        animate: (state, action)=>{
          
            state.value=action.payload
        }
    }
})

export const {animate}= slice.actions

export default slice.reducer