/**
 * Created by kieranderfus on 7/12/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { postCampus } from '../reducers';

function NewCampusEntry (props) {

    // console.log("NewCampusEntry: props", props);
    let { name, handleSubmit } = props;

    return (
        <form id="new-message-form" onSubmit={evt => handleSubmit(name, evt)}>
            {/*handleSubmit(name, evt)*/}
            <div className="input-group input-group-lg">
                <input
                    className="form-control"
                    type="text"
                    name="content"
                    onChange={evt => name = evt.target.value} // this.setState({ name: evt.target.value })}
                    placeholder="New Campus"
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
        handleSubmit (name, evt) {
            evt.preventDefault();
            console.log(name);
            dispatch(postCampus({ name: name, image: '' }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCampusEntry);
