const clocks = [
  {
    id: 1,
    imageClock:
      'https://cdn21vek.by/img/galleries/107/446/preview_b/t0554171105700_tissot_560d1af9300af.jpeg',
    brandClock: 'Tissot',
    collection: 'T-Sport',
    vendorCode: 'T055.417.11.057.00',
    price: 1000,
    rating: 0,
  },
  {
    id: 2,
    imageClock:
      'https://cdn21vek.by/img/galleries/781/468/preview_b/t1014172306100_tissot_5bffb202e2065.png',
    brandClock: 'Tissot',
    collection: 'T-Classic',
    vendorCode: 'T101.417.23.061.00',
    price: 1500,
    rating: 2,
  },
  {
    id: 3,
    imageClock:
      'https://cdn21vek.by/img/galleries/1009/136/preview_b/t0984073605200_tissot_5cda9f1025c3f.png',
    brandClock: 'Tissot',
    collection: 'T-Sport',
    vendorCode: 'T098.407.36.052.00',
    price: 1400,
    rating: 1,
  },
  {
    id: 4,
    imageClock:
      'https://cdn21vek.by/img/galleries/568/868/preview_b/t1166173605701_tissot_5baa150634c75.jpeg',
    brandClock: 'Tissot',
    collection: 'T-Sport',
    vendorCode: 'T116.617.36.057.01',
    price: 1800,
    rating: 3,
  },
];

const clocksReducer = (state = clocks, action) => {
  switch (action.type) {
    case 'ADD_CLOCK_ADMINPAGE':
      return [
        ...state,
        {
          id: action.id,
          imageClock: action.imageClock,
          brandClock: action.brandClock,
          collection: action.collection,
          vendorCode: action.vendorCode,
          price: action.price,
          rating: 0,
        },
      ];
    case 'ADD_RATING':
      return [
        ...state.map(item => {
          if (item.id === action.id) {
            return {
              ...item,
              rating: action.value,
            };
          }
          return item;
        }),
      ];

    default:
      return state;
  }
};

export { clocksReducer };
