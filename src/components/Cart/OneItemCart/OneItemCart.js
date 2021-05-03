import React from 'react';
import PropTypes from 'prop-types';
import './OneItemCart.css';
import { connect } from 'react-redux';
import { addToCart, deleteItemFromCart, minusOneClock } from '../../../redux/actions/cartActions';

class OneItemCart extends React.Component {
  render() {
    const { id, imageClock, brandClock, price, count } = this.props;
    const deleteFromCart = () => {
      this.props.deleteItemsCart(id);
    };

    const deleteOneHandler = () => {
      this.props.deleteOneItem(id);
    };

    const addOneHandler = () => {
      this.props.addOneClock(id);
    };
    return (
      <tr key={id} className="table-light">
        <td>
          <img src={imageClock} alt="cart-clock" className="clock-cart" />
        </td>
        <td>{brandClock}</td>
        <td>{price}$</td>
        <td className="count-wrapper">
          <button type="button" className="btn-minus" onClick={deleteOneHandler}>
            <i className="far fa-minus-square" />
          </button>
          {count}
          <button type="button" className="btn-plus" onClick={addOneHandler}>
            <i className="far fa-plus-square" />
          </button>
        </td>
        <td>
          <button type="button" className="btn-delete" onClick={deleteFromCart}>
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
    deleteOneItem: id => dispatch(minusOneClock(id)),
    addOneClock: id => dispatch(addToCart(id)),
  };
};

OneItemCart.propTypes = {
  id: PropTypes.number.isRequired,
  imageClock: PropTypes.string.isRequired,
  brandClock: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  deleteItemsCart: PropTypes.func.isRequired,
  deleteOneItem: PropTypes.func.isRequired,
  addOneClock: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(OneItemCart);
