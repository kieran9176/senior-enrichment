import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../reducers';
import { fetchCampuses } from '../store';

class NewStudentEntry extends Component {

    componentDidMount () {
        this.props.fetchCampusesThunk();
    }

    render () {

        let {name, email, campuses, handleSubmit, match, campusId} = this.props;

        function selectedValue () {
            const x = document.getElementById("campusesSelect").selectedIndex;
            return document.getElementsByTagName("option")[x].value;
        }

        let select_menu;
        if (!match.path.includes("campuses")) {
            select_menu =
                <select id="campusesSelect" name="campuses">
                    { campuses.map(campus =>
                        <option
                            key={campus.id}
                            value={campus.id}
                        >{campus.name}</option>
                    )}
                </select>
        } else {
            select_menu = null;
        }

        return (
            <form id="new-message-form" onSubmit={evt => handleSubmit(name, email, select_menu ? selectedValue() : campusId, evt)}>
                <div className="input-group input-group-lg">
                    <input
                        className="form-control"
                        type="text"
                        name="content"
                        onChange={evt => name = evt.target.value}
                        placeholder="New Student Name"
                    />
                    <input
                        className="form-control"
                        type="text"
                        name="content"
                        onChange={evt => email = evt.target.value}
                        placeholder="New Student Email"
                    />
                    {select_menu}
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">Submit</button>
                    </span>
                </div>
            </form>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses,
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        handleSubmit (name, email, campusId, evt) {
            evt.preventDefault();
            dispatch(postStudent({ name: name, email: email, campusId: campusId }));
        },
        fetchCampusesThunk () {
            dispatch(fetchCampuses());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewStudentEntry);
