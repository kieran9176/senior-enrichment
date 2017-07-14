/**
 * Created by kieranderfus on 7/12/17.
 */
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { putStudent } from '../reducers';
import { fetchStudents } from '../store';

class Student extends Component {

    componentDidMount () {
        this.props.fetchStudentsThunk();
    }

    render () {
        const studentId = Number(this.props.match.params.studentId);
        const single_student_array = (this.props.students.filter(student => student.id === studentId));
        const { campuses, handleSubmit } = this.props;
        console.log(campuses);

        let student, name, email, campusId;
        if (single_student_array.length) {
            student = single_student_array[0];
            name = student.name;
            email = student.email;
            campusId = student.campusId;
        }

        let single_campus_array, campusName;
        if (campuses.length) {
            single_campus_array = (campuses.filter(campus => campus.id === +campusId));
            campusName = single_campus_array[0].name;
        }

        function selectedValue () {
            const x = document.getElementById("campusesSelect").selectedIndex;
            return document.getElementsByTagName("option")[x].value;
        }

        return (
            <div>
                <h1>{name}</h1>
                <h2>{email}</h2>
                <NavLink to={`/campuses/${campusId}`} activeClassName="active">
                    <h2>{campusName}</h2>
                </NavLink>
                <form id="updateStudent" onSubmit={evt => handleSubmit(studentId, name ? name : student.name, email ? email : student.email, selectedValue(), evt)}>
                    <div className="input-group input-group-lg">
                        <input
                            className="form-control"
                            type="text"
                            name="content"
                            onChange={evt => name = evt.target.value}
                            placeholder="Update Name"
                        />
                        <input
                            className="form-control"
                            type="text"
                            name="content"
                            onChange={evt => email = evt.target.value}
                            placeholder="Update Email"
                        />
                        <select id="campusesSelect" name="campuses">
                            { campuses.map(campus =>
                                <option
                                    key={campus.id}
                                    value={campus.id}
                                >{campus.name}</option>
                            )}
                        </select>
                        <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">Update</button>
                    </span>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        students: state.students,
        campuses: state.campuses
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        fetchStudentsThunk () {
            dispatch(fetchStudents());
        },
        handleSubmit (id, name, email, campusId, evt) {
            evt.preventDefault();
            dispatch(putStudent(id, { name: name, email: email, campusId: +campusId }));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Student));
