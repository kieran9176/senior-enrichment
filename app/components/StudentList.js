/**
 * Created by kieranderfus on 7/12/17.
 */
import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import NewStudentEntry from './NewStudentEntry';
import { removeStudent } from '../reducers/students';


function StudentList(props) {

    let students = props.students;
    const handleSubmit = props.handleSubmit;
    const campusId = Number(props.match.params.campusId);
    if (campusId) students = (store.getState().students.filter(student => student.campusId === campusId));

    return (
        <div>
            <h1>Students</h1>
            <ul className="media-list">
                { students.map(student =>
                    <li key={student.id}>
                        <NavLink to={`/students/${student.id}`} activeClassName="active">
                            <span>{student.name}</span>
                        </NavLink>
                        <button className="btn btn-default" type="delete" onClick={evt => handleSubmit(student, evt)}>X</button>
                    </li>
                )}
            </ul>
            <NewStudentEntry />
        </div>
    );
}

const mapStateToProps = function (state) {
    return {
        students: state.students,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        handleSubmit (student, evt) {
            evt.preventDefault();
            dispatch(removeStudent(student));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentList));
