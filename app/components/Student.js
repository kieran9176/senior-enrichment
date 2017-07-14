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
        const studentId = Number(this.props.match.params.studentId); // gets studentId from props
        const single_student_array = (this.props.students.filter(student => student.id === studentId));
        const { campuses, handleSubmit } = this.props;

        let student, name, email, campusId;
        if (single_student_array.length) { // waits until students is populated
            student = single_student_array[0];
            name = student.name;
            email = student.email;
            campusId = student.campusId;
        }

        let single_campus_array, campusName;
        if (campuses.length) { // waits until campuses is populated
            single_campus_array = (campuses.filter(campus => campus.id === +campusId));
            campusName = single_campus_array[0].name;
        }

        // grabs campusId from form's select dropdown menu
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
                                                                        {/* Passing ternary operators as parameters. Why? If the user changes a form input field,
                                                                        I pass the changed value to handleSubmit upon submission. If not, I pass the value
                                                                        that was originally rendered on the page. */}
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
