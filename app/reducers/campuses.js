/**
 * Created by kieranderfus on 7/11/17.
 */
import axios from 'axios';

const GET_CAMPUS = "GET_CAMPUS";
const GET_CAMPUSES = "GET_CAMPUSES";
const UPDATE_CAMPUS = "UPDATE_CAMPUS";
export const DELETE_CAMPUS = "DELETE_CAMPUS";

export function getCampus (campus) {
    const action = { type: GET_CAMPUS, campus };
    return action;
}

export function getCampuses (campuses) {
    const action = { type: GET_CAMPUSES, campuses };
    return action;
}

export function updateCampus (campus) {
    const action = { type: UPDATE_CAMPUS, campus }
    return action;
}

export function deleteCampus (campus) {
    const action = { type: DELETE_CAMPUS, campus };
    return action;
}

export function fetchCampuses () {
    return function thunk (dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            });
    };
}

export function postCampus (campus) {
    return function thunk (dispatch) {
        return axios.post('/api/campuses', campus)
            .then(response => {
                dispatch(getCampus(response.data.campus));
            });
    };
}

export const renameCampus = (id, campus) => dispatch => {
    axios.put(`/api/campuses/${id}`, campus)
        .then(res => dispatch(updateCampus(res.data)))
        .catch(err => console.error(`Updating user: ${campus} unsuccessful`, err));
};

export const removeCampus = campus => dispatch => {
    dispatch(deleteCampus(campus));
    axios.delete(`/api/campuses/${campus.id}`)
        .catch(err => console.error(`Removing user: ${campus.id} unsuccessful`, err));
};

export default function campusReducer (state = [], action) {

    switch (action.type) {

        case GET_CAMPUSES:
            return action.campuses;

        case GET_CAMPUS:
            return [...state, action.campus];

        case UPDATE_CAMPUS:
            return state.map(campus => (
                action.campus.id === campus.id ? action.campus : campus
            ));

        case DELETE_CAMPUS:
            return state.filter(campus => campus.id !== action.campus.id);

        default:
            return state;
    }

}






