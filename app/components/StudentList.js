/**
 * Created by kieranderfus on 7/12/17.
 */
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import NewStudentEntry from './NewStudentEntry';
import { removeStudent } from '../reducers/students';


class StudentList extends Component {

    render() {

        const { students, handleSubmit } = this.props;
        const campusId = Number(this.props.match.params.campusId);

        let studentsOfCampus;
        if (campusId) studentsOfCampus = (students.filter(student => student.campusId === campusId));
        else studentsOfCampus = students;

        return (
            <div>
                <h1>Students</h1>
                <ul className="media-list">
                    { studentsOfCampus.map(student =>
                        <li key={student.id}>
                            <NavLink to={`/students/${student.id}`} activeClassName="active">
                                <span>{student.name}</span>
                            </NavLink>
                            <button className="btn btn-default" type="delete"
                                    onClick={evt => handleSubmit(student, evt)}>X
                            </button>
                        </li>
                    )}
                </ul>
                <NewStudentEntry match={this.props.match} campusId={campusId}/>
            </div>
        );
    }
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
