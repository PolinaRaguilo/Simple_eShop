import React from 'react';
import PropTypes from 'prop-types';

import './UserItem.css';
import { connect } from 'react-redux';
import { deleteUser } from '../../../../../redux/actions/usersAction';

class UserItem extends React.Component {
  onDeleteUserHandler = () => {
    this.props.onDeleteUser(this.props.id);
  };

  render() {
    const { firstName, lastName, email } = this.props;

    return (
      <tr>
        <td> {firstName} </td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>
          <button type="button" className="btn btn-primary" onClick={this.onDeleteUserHandler}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteUser: id => dispatch(deleteUser(id)),
  };
};

UserItem.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(UserItem);
