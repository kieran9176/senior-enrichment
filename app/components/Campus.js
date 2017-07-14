/**
 * Created by kieranderfus on 7/12/17.
 */
import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentList from './StudentList';
import { fetchCampuses } from '../store';
import { renameCampus } from '../reducers/campuses'

class Campus extends Component {

     componentDidMount () {
        this.props.fetchCampusesThunk();
    }

    render () {
        const campusId = Number(this.props.match.params.campusId);
        const single_campus_array = (this.props.campuses.filter(campus => campus.id === campusId));

        let campus = single_campus_array[0] && single_campus_array[0];
        let name = campus && campus.name;

        const handleSubmit = this.props.handleSubmit;
        let newName = null;

        return (
            <div>
                <h1>{name}</h1>
                <StudentList />
                <div></div>
                <form id="updateCampus" onSubmit={evt => handleSubmit(campusId, newName ? newName : name, evt)}>
                    <div className="input-group input-group-lg">
                        <input
                            className="form-control"
                            type="text"
                            name="content"
                            onChange={evt => newName = evt.target.value}
                            placeholder="Update Campus Name"
                        />
                        <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">Update Campus</button>
                    </span>
                    </div>
                </form>
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
        handleSubmit (id, campusName, evt) {
            evt.preventDefault();
            dispatch(renameCampus(id, { name: campusName, image: '' }));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Campus));


