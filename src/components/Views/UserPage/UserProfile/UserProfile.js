/* eslint-disable no-debugger */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './UserProfile.css';
import { deleteRequest } from '../../../../redux/actions/usersAction';
import {
  closeEditProfile,
  openEditProfile,
  updateImg,
  updateInf,
} from '../../../../redux/actions/profileActions';
import Spinner from '../../../Spinner/Spinner';
import ChangePassword from '../../../ChangePassword/ChangePassword';
import { fbStorage } from '../../../../config/fbConfig';

class UserProfile extends React.Component {
  currentUser = this.props.users.find(user => user.email === this.props.currentUser);

  state = {
    firstName: this.currentUser.firstName,
    lastName: this.currentUser.lastName,
    isOpenChange: false,
    imageUpload: null,
    progress: 0,
    nameImg: '',
  };

  handleChangeImage = e => {
    if (e.target.files[0]) {
      this.setState({ imageUpload: e.target.files[0] });
      this.setState({ nameImg: e.target.files[0].name });
    }
  };

  uploadHandle = e => {
    e.preventDefault();

    const uploadTask = fbStorage
      .ref(`/usersAvatar/${this.state.imageUpload.name}`)
      .put(this.state.imageUpload);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progressUpload = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress: progressUpload });
      },
      error => {
        console.log(error);
      },
      () => {
        fbStorage
          .ref('usersAvatar')
          .child(this.state.imageUpload.name)
          .getDownloadURL()
          .then(url => {
            this.props.onUpdateImage(this.currentUser.id, url);
          })
          .then(() => this.setState({ nameImg: '' }));
      }
    );
  };

  onUpdateInformation = () => {
    this.props.onEditClose();
    this.props.onUpdateInf(this.currentUser.id, this.state.firstName, this.state.lastName);
  };

  onInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onRequestHandler = () => {
    this.props.onRequestDelete(this.currentUser.id);
  };

  onOpenChangeModal = () => {
    this.setState({ isOpenChange: true });
  };

  onCloseChangeModal = () => {
    this.setState({ isOpenChange: false });
  };

  render() {
    const currUser = this.props.users.find(user => user.email === this.props.currentUser);
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <>
        <div className="container">
          <img
            id="profile-img"
            className="profile-img-card"
            src={
              currUser.imgUrl === '' || currUser.imgUrl === undefined
                ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/600px-User_icon_2.svg.png'
                : currUser.imgUrl
            }
            alt="UserImg"
          />
          <h4 className="profile-title">Profile</h4>
          {this.props.showAdmin === false && (
            <div className="btnWrap">
              <form action="submit">
                <label htmlFor="upload" className="upload-label">
                  Upload avatar
                </label>
                {this.state.nameImg !== '' && (
                  <>
                    <div className="div__upload">
                      <span className="span__URL"> {this.state.nameImg.substr(0, 40)}... </span>
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                        onClick={this.uploadHandle}
                      >
                        Upload
                      </button>
                    </div>
                    <progress value={this.state.progress} max="100" />
                  </>
                )}

                <input
                  type="file"
                  id="upload"
                  className="upload-file__hide"
                  onChange={this.handleChangeImage}
                />
              </form>
              <div className="btnEditWrap">
                <button
                  type="button"
                  className={
                    this.props.isEdit
                      ? 'btn btn-outline-primary show-save'
                      : 'btn btn-outline-primary btn-save'
                  }
                  onClick={this.onUpdateInformation}
                >
                  Save
                </button>

                <button
                  type="button"
                  className="btn btn-outline-primary btn-edit"
                  onClick={this.props.onEdit}
                >
                  Edit profile
                </button>
              </div>
            </div>
          )}

          <table className="table profile-table">
            <tbody>
              <tr>
                <td>
                  <b>Name</b>
                </td>
                <td>
                  {this.props.isEdit ? (
                    <input
                      type="text"
                      className="form-control edit-inputs"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onInputChange}
                      required
                    />
                  ) : (
                    currUser.firstName
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Surname</b>
                </td>
                <td>
                  {this.props.isEdit ? (
                    <input
                      type="text"
                      name="lastName"
                      className="form-control edit-inputs"
                      value={this.state.lastName}
                      onChange={this.onInputChange}
                      required
                    />
                  ) : (
                    currUser.lastName
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Email</b>
                </td>
                <td>{currUser.email}</td>
              </tr>
            </tbody>
          </table>
          <div className="btns">
            {this.props.showAdmin === false && (
              <>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-editPsw"
                  onClick={this.onOpenChangeModal}
                >
                  Change password
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-deleteProfile"
                  onClick={this.onRequestHandler}
                >
                  <span className="beforeSend">Delete profile</span>
                  <span className="afterSend">
                    You sent the request to delete <i className="fas fa-user-slash" />
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
        {this.state.isOpenChange && <ChangePassword onCloseModal={this.onCloseChangeModal} />}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersReducer.usersAdmin,
    loading: state.usersReducer.loading,
    isEdit: state.profileReducer.openEdit,
    showAdmin: state.authorizationReducer.showAdmin,
    currentUser: state.authorizationReducer.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestDelete: id => dispatch(deleteRequest(id)),
    onEdit: () => dispatch(openEditProfile()),
    onEditClose: () => dispatch(closeEditProfile()),
    onUpdateInf: (id, newName, newSurname) => dispatch(updateInf(id, newName, newSurname)),
    onUpdateImage: (id, urlImg) => dispatch(updateImg(id, urlImg)),
  };
};

UserProfile.propTypes = {
  onRequestDelete: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  isEdit: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditClose: PropTypes.func.isRequired,
  onUpdateInf: PropTypes.func.isRequired,
  onUpdateImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showAdmin: PropTypes.bool.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
