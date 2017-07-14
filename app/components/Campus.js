/**
 * Created by kieranderfus on 7/12/17.
 */
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentList from './StudentList';
import { fetchCampuses } from '../store';
import { removeCampus } from '../reducers/campuses'

class Campus extends Component {

     componentDidMount () {
        this.props.fetchCampusesThunk();
    }

    render () {
        const campusId = Number(this.props.match.params.campusId);
        const single_campus_array = (this.props.campuses.filter(campus => campus.id === campusId));

        let campus = single_campus_array[0] && single_campus_array[0];
        let name = campus && campus.name;

        // const handleSubmit = this.props.handleSubmit;

        return (
            <div>
                <h1>{name}</h1>
                <StudentList />
                {/*<NavLink to={`/campuses`} activeClassName="active">*/}
                    {/*<button className="btn btn-default" type="delete" onClick={evt => handleSubmit(campus, evt)}>Delete Campus</button>*/}
                {/*</NavLink>*/}
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
        },
        handleSubmit (campus, evt) {
            evt.preventDefault();
            dispatch(removeCampus(campus));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Campus));


