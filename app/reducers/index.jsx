import { combineReducers } from 'redux'

// const initialState = {};
//
// const rootReducer = function(state = initialState, action) {
//   switch(action.type) {
//     default: return state
//   }
// };

// import the campuses sub-reducer
import campuses from './campuses';
import students from './students';

const reducer = combineReducers({
    campuses,
    students
});


// export default rootReducer
export default reducer;

// export action creators
export * from './campuses';
export * from './students';
