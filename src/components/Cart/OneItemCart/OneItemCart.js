import React from 'react';
import PropTypes from 'prop-types';
import './OneItemCart.css';
import { connect } from 'react-redux';
import { deleteItemFromCart } from '../../../redux/actions/cartActions';

class OneItemCart extends React.Component {
  deleteFromCart = () => {
    this.props.deleteItemsCart(this.props.id);
  };

  render() {
    const { id, imageClock, brandClock, vendorCode, price } = this.props;
    return (
      <tr key={id} className="table-light">
        <td>
          <img src={imageClock} alt="cart-clock" className="clock-cart" />
        </td>
        <td>{brandClock}</td>
        <td>{vendorCode}</td>
        <td>{price}$</td>
        <td>
          <button type="button" className="btn-delete" onClick={this.deleteFromCart}>
            <i className="far fa-trash-alt" />
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItemsCart: id => dispatch(deleteItemFromCart(id)),
  };
};

OneItemCart.propTypes = {
  id: PropTypes.number.isRequired,
  imageClock: PropTypes.string.isRequired,
  brandClock: PropTypes.string.isRequired,
  vendorCode: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  deleteItemsCart: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(OneItemCart);
