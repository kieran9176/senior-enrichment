/**
 * Created by kieranderfus on 7/12/17.
 */
import axios from 'axios';
import { DELETE_CAMPUS as DELETE_STUDENTS_FROM_CAMPUS } from './campuses';

const GET_STUDENT = "GET_STUDENT";
const GET_STUDENTS = "GET_STUDENTS";
const DELETE_STUDENT = "DELETE_STUDENT";
const UPDATE_STUDENT = "UPDATE_STUDENT";

export function getStudent (student) {
    const action = { type: GET_STUDENT, student };
    return action;
}

export function getStudents (students) {
    const action = { type: GET_STUDENTS, students };
    return action;
}

export function deleteStudent (student) {
    const action = { type: DELETE_STUDENT, student };
    return action;
}

export function updateStudent (student) {
    const action = { type: UPDATE_STUDENT, student };
    return action;
}

export function fetchStudents () {
    return function thunk (dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
            });
    };
}

export function postStudent(student) {
    return function thunk(dispatch) {
        return axios.post('/api/students', student)
            .then(response => {
                dispatch(getStudent(response.data.student));
            });
    };
}

export function putStudent (id, student) {
    return function thunk(dispatch) {
        console.log("STUDENTS.JS, PUT STUDENT STUDENT OBJECT", student);
        return axios.put(`/api/students/${id}`, student)
            .then(res => dispatch(updateStudent(res.data)))
            .catch(err => console.error(`Updating user: ${student} unsuccessful`, err));
    };
}

export function removeStudent (student) {
    return function thunk(dispatch) {
        dispatch(deleteStudent(student));
        axios.delete(`/api/students/${student.id}`)
            .catch(err => console.error(`Removing user: ${student.id} unsuccessful`, err));
    }
}

export default function studentReducer (state = [], action) {

    switch (action.type) {

        case GET_STUDENTS:
            return action.students;

        case GET_STUDENT:
            return [...state, action.student];

        case DELETE_STUDENT:
            return state.filter(student => student.id !== action.student.id);

        case UPDATE_STUDENT:
            return state.map(student => (
                action.student.id === student.id ? action.student : student
            ));

        case DELETE_STUDENTS_FROM_CAMPUS:
            return state.filter(student => student.campusId !== action.campus.id);

        default:
            return state;
    }
}
