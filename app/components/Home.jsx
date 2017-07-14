import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import CampusList from './CampusList';
import Campus from './Campus';
import StudentList from './StudentList';
import Student from './Student';
import Navbar from './Navbar';
import store, {fetchCampuses, fetchStudents } from '../store';

class Home extends Component {

    componentDidMount () {
        const campusesThunk = fetchCampuses();
        const studentsThunk = fetchStudents();

        store.dispatch(campusesThunk);
        store.dispatch(studentsThunk);
    }

    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route path="/campuses/:campusId" component={Campus}/>
                    <Route path="/students/:studentId" component={Student}/>
                    <Route exact path="/campuses" component={CampusList}/>
                    <Route exact path="/students" component={StudentList}/>
                </Switch>
            </div>
        );
    }
}

export default Home;