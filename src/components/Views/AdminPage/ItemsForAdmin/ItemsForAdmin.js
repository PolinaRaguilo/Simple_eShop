import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import OneClockItemForAdmin from './OneClockItemForAdmin/OneClockItemForAdmin';
import Spinner from '../../../Spinner/Spinner';
import './ItemsForAdmin.css';
import { addNewClock } from '../../../../redux/actions/clocksActions';
import ErrorLoading from '../../../ErrorLoading/ErrorLoading';

class ItemsForAdmin extends React.Component {
  state = {
    currentPage: 1,
  };

  onSubmit = e => {
    const { imageClock, brandClock, collection, vendorCode, price, gender } = this.state;
    e.preventDefault();
    this.props.addNewClock(imageClock, brandClock, collection, vendorCode, Number(price), gender);
  };

  onInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onChangePage = (e, page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { clocks } = this.props;
    const indexOfLastItem = this.state.currentPage * 4;
    const indexOfFirstItem = indexOfLastItem - 4;
    const currentClocks = clocks.slice(indexOfFirstItem, indexOfLastItem);

    const clocksItems = currentClocks.map(item => {
      const {
        id,
        imageClock,
        brandClock,
        collection,
        vendorCode,
        price,
        rating,
        editClock,
        gender,
      } = item;
      return (
        <OneClockItemForAdmin
          key={id}
          id={id}
          imageClock={imageClock}
          brandClock={brandClock}
          collection={collection}
          vendorCode={vendorCode}
          price={price}
          gender={gender}
          rating={rating}
          editClock={editClock}
        />
      );
    });
    if (this.props.onLoading) {
      return <Spinner />;
    }
    if (this.props.onErrorClocks) {
      return <ErrorLoading />;
    }
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <div className="form-group add-clock ">
            <div className="col">
              <label htmlFor="imgInput">Image</label>
              <input
                type="text"
                className="form-control"
                id="imgInput"
                placeholder="URL"
                name="imageClock"
                onChange={this.onInputChange}
              />

              <label htmlFor="brandInput">Brand</label>
              <input
                type="text"
                className="form-control"
                id="brandInput"
                name="brandClock"
                onChange={this.onInputChange}
              />

              <div className="form-group">
                <label className="control-label" htmlFor="priceInput">
                  Price
                </label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="priceInput"
                    name="price"
                    onChange={this.onInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <label htmlFor="collectionInput">Collection</label>
              <input
                type="text"
                className="form-control"
                id="collectionInput"
                name="collection"
                onChange={this.onInputChange}
              />

              <label htmlFor="vendorCodeInput">Code</label>
              <input
                type="text"
                className="form-control"
                id="vendorCodeInput"
                name="vendorCode"
                onChange={this.onInputChange}
              />

              <label htmlFor="choose-gender">Gender</label>
              <select
                className="custom-select"
                id="choose-gender"
                name="gender"
                onChange={this.onInputChange}
              >
                <option value="">None</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <button type="submit" className="btn btn-primary btn-add">
                Add
              </button>
            </div>
          </div>
        </form>
        <table className="table-container table table-hover">
          <thead className="table-warning">
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Gender</th>
              <th scope="col">Brand</th>
              <th scope="col">Collection</th>
              <th scope="col">Code</th>
              <th scope="col">Price</th>
              <th scope="col">Rating</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{clocksItems}</tbody>
        </table>
        {this.props.clocks.length >= 4 && (
          <Pagination
            className="pagination__admin-items"
            color="secondary"
            count={Math.ceil(this.props.clocks.length / 4)}
            onChange={(e, page) => this.onChangePage(e, page)}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    clocks: state.clocksReducer.clocksData,
    onLoading: state.clocksReducer.loadingClocks,
    onErrorClocks: state.clocksReducer.errorClocks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewClock: (imageClock, brandClock, collection, vendorCode, price, gender) =>
      dispatch(addNewClock(imageClock, brandClock, collection, vendorCode, price, gender)),
  };
};

ItemsForAdmin.propTypes = {
  clocks: PropTypes.array.isRequired,
  addNewClock: PropTypes.func.isRequired,
  onLoading: PropTypes.bool.isRequired,
  onErrorClocks: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsForAdmin);
