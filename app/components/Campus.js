/**
 * Created by kieranderfus on 7/12/17.
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentList from './StudentList';
import { fetchCampuses } from '../store';

class Campus extends Component {

     componentDidMount () {
        this.props.fetchCampusesThunk();
    }

    render () {
        const campusId = Number(this.props.match.params.campusId);
        const single_campus_array = (this.props.campuses.filter(campus => campus.id === campusId));

        let name = single_campus_array[0] && single_campus_array[0].name; // How do I just reference it after the component mounts? To avoid this?

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

const mapDispatchToProps = function (dispatch) {
    return {
        fetchCampusesThunk () {
            dispatch(fetchCampuses());
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Campus));


