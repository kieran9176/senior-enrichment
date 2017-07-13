/**
 * Created by kieranderfus on 7/12/17.
 */
import React, { Component } from 'react';
import { withRouter, NavLink, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentList from './StudentList';
import store from '../store';

class Student extends Component {

    render () {
        const studentId = Number(this.props.match.params.studentId);
        const single_student_array = (store.getState().students.filter(student => student.id === studentId));

        let student, name, email;
        if (single_student_array.length) {
            student = single_student_array.pop();
            name = student.name;
            email = student.email;
        }

        return (
            <div>
                <h1>{name}</h1>
                <h2>{email}</h2>
            </div>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        students: state.students,
    };
};

export default withRouter(connect(mapStateToProps)(Student));
