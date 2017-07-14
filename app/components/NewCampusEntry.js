/**
 * Created by kieranderfus on 7/12/17.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { reset } from 'redux-form';
import { postCampus } from '../reducers';

class NewCampusEntry extends Component {

    render () {

        let {name, handleSubmit} = this.props;
        return (
            <form name="new-message-form" onSubmit={evt => handleSubmit(name, evt)}>
                <div className="input-group input-group-lg">
                    <input
                        className="form-control"
                        type="text"
                        name="content"
                        onChange={evt => name = evt.target.value}
                        placeholder="New Campus"
                    />
                    <span className="input-group-btn">
          <button className="btn btn-default" type="submit">Submit</button>
        </span>
                </div>
            </form>
        );
    }
}

const mapStateToProps = null;
const mapDispatchToProps = function (dispatch) {
    return {
        handleSubmit (name, evt) {
            evt.preventDefault();
            // dispatch(reset('new-message-form'));
            dispatch(postCampus({ name: name, image: '' }));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewCampusEntry);
