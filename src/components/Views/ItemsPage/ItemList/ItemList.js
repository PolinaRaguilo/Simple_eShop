import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { addToCart } from '../../../../redux/actions/cartActions';
import './ItemList.css';
import OneItem from './OneItem/OneItem';
import Spinner from '../../../Spinner/Spinner';

class ItemList extends React.Component {
  state = {
    value: 'All',
    gender: 'All',
    priceValue: [700, 2000],
    brands: [
      { id: 1, brand: 'All' },
      { id: 2, brand: 'Tissot' },
      { id: 3, brand: 'MK' },
      { id: 4, brand: 'CASIO' },
    ],
    genders: [
      { id: 1, gender: 'All' },
      { id: 2, gender: 'Male' },
      { id: 3, gender: 'Female' },
    ],
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleChangeGender = event => {
    this.setState({ gender: event.target.value });
  };

  handleChangePrice = (event, newValue) => {
    this.setState({ priceValue: newValue });
  };

  AddToCart = idClock => {
    const clock = this.props.dataClocks.find(item => item.id === idClock);
    const { id, imageClock, brandClock, vendorCode, price } = clock;
    this.props.onAddToCart(id, imageClock, brandClock, vendorCode, price);
  };

  render() {
    const { dataClocks } = this.props;

    const clockItems = dataClocks.map(item => {
      const { id, imageClock, brandClock, collection, vendorCode, price, rating } = item;
      return (
        <OneItem
          key={id}
          id={id}
          imageClock={imageClock}
          brandClock={brandClock}
          collection={collection}
          vendorCode={vendorCode}
          price={price}
          rating={rating}
          onAddedToCart={this.AddToCart}
        />
      );
    });

    const brandsList = this.state.brands.map(item => {
      const { id, brand } = item;
      return (
        <RadioGroup
          key={id}
          aria-label="brand"
          name={brand}
          value={this.state.value}
          onChange={this.handleChange}
          className="one-radio"
        >
          <FormControlLabel key={id} value={brand} control={<Radio />} label={brand} />
        </RadioGroup>
      );
    });

    const genderList = this.state.genders.map(item => {
      return (
        <RadioGroup
          key={item.id}
          aria-label="brand"
          name={item.gender}
          value={this.state.gender}
          onChange={this.handleChangeGender}
          className="one-radio"
        >
          <FormControlLabel
            key={item.id}
            value={item.gender}
            control={<Radio />}
            label={item.gender}
          />
        </RadioGroup>
      );
    });
    if (this.props.logged === false) {
      return <Redirect to="/" />;
    }
    return (
      <div className="content">
        <div className="row">
          <div className="col">
            <div className="card border-primary mb-3 wrapper">
              <div className="brand-wrapper">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Brand:</FormLabel>
                  {brandsList}
                </FormControl>
              </div>
              <div className="gender-wrapper">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender:</FormLabel>
                  {genderList}
                </FormControl>
              </div>
              <div className="price-wrapper">
                <FormLabel component="legend">Price:</FormLabel>
                <Slider
                  value={this.state.priceValue}
                  onChange={this.handleChangePrice}
                  valueLabelDisplay="auto"
                  min={400}
                  max={5000}
                  step={100}
                />
              </div>
            </div>
          </div>
          <div className="col-md-8 products">
            <div className="row"> {this.props.onLoading ? <Spinner /> : clockItems}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataClocks: state.clocksReducer.clocksData,
    onLoading: state.clocksReducer.loadingClocks,
    logged: state.authorizationReducer.logged,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddToCart: (id, imageClock, brandClock, vendorCode, price) =>
      dispatch(addToCart(id, imageClock, brandClock, vendorCode, price)),
  };
};

ItemList.propTypes = {
  dataClocks: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onLoading: PropTypes.bool.isRequired,
  logged: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
