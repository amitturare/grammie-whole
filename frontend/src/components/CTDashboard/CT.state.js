export const actionTypes = {
  SET_DASHBOARD_DATA: 'SET_DASHBOARD_DATA',
  SET_ALL_CUSTOMERS: 'SET_ALL_CUSTOMERS',
  SET_CURRENT_CUSTOMERS: 'SET_CURRENT_CUSTOMERS',
  SET_PAST_CUSTOMERS: 'SET_PAST_CUSTOMERS',
  SET_PENDING_REQUESTS: 'SET_PENDING_REQUESTS'
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DASHBOARD_DATA:
      return { ...state, dashboardData: action.payload };
    case actionTypes.SET_ALL_CUSTOMERS:
      return { ...state, allCustomers: [action.payload] };
    case actionTypes.SET_CURRENT_CUSTOMERS:
      return { ...state, currentCustomers: action.payload };
    case actionTypes.SET_PAST_CUSTOMERS:
      return { ...state, pastCustomers: action.payload };
    case actionTypes.SET_PENDING_REQUESTS:
      return { ...state, pendingRequests: action.payload };
    default:
      return state;
  }
};
