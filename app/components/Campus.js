/**
 * Created by kieranderfus on 7/12/17.
 */
import React, { Component } from 'react';
import { withRouter, NavLink, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentList from './StudentList';
import store, { fetchCampuses } from '../store';

class Campus extends Component {

     componentDidMount () {
        const campusesThunk = fetchCampuses();
        store.dispatch(campusesThunk);
    }

    render () {
        const campusId = Number(this.props.match.params.campusId);
        const campus = (store.getState().campuses.filter(campus => campus.id === campusId));

        let name;
        if (campus.length) name = campus.pop().name; // How do I just reference it after the component mounts? To avoid this?

        return (
            <div>
                <h1>{name}</h1>
                <StudentList />
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses
    };
};

export default withRouter(connect(mapStateToProps)(Campus));


