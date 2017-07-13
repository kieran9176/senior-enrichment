import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import NewCampusEntry from './NewCampusEntry';
import { removeCampus } from '../reducers/campuses'

function CampusList(props) {

    const { campuses, handleSubmit } = props;

    return (
        <div>
            <h1>Campuses</h1>
            <ul className="media-list">
                { campuses.map(campus =>
                    <li key={campus.id}>
                        <NavLink to={`/campuses/${campus.id}`} activeClassName="active">
                            <span>{campus.name}</span>
                        </NavLink>
                        <button className="btn btn-default" type="delete" onClick={evt => handleSubmit(campus, evt)}>X</button>
                    </li>
                )}
            </ul>
            <NewCampusEntry />
        </div>
    );
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        handleSubmit (campus, evt) {
            // console.log("ID:", id);
            evt.preventDefault();
            dispatch(removeCampus(campus));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusList));

