import React from 'react';
import { connect } from 'react-redux';
import { postStudent } from '../reducers'; // make sure this exists

function NewStudentEntry (props) {

    let { name, email, handleSubmit } = props;

    return (
        <form id="new-message-form" onSubmit={evt => handleSubmit(name, email, evt)}>
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
                <span className="input-group-btn">
          <button className="btn btn-default" type="submit">Submit</button>
        </span>
            </div>
        </form>
    );
}

const mapStateToProps = null;

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit (name, email, evt) {
            evt.preventDefault();
            dispatch(postStudent({ name: name, email: email }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewStudentEntry);
