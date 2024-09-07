import { createContext, useReducer } from "react";
import { reducer, actionTypes } from "./CT.state";
import careTakerService from "../../services/CareTaker.service";

export const CTContext = createContext();

const {
  getCareTakerDashboardData,
  getAllCustomers,
  getCurrentCustomers,
  getPastCustomers,
  getAllPendingRequests,
  updateStatusForCustomers,
} = careTakerService;

const initialState = {
  data: {},
  dashboardData: null,
  appointments: [],
  allCustomers: [],
  currentCustomers: [],
  pastCustomers: [],
  pendingRequests: [],
};

export const CTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = CareTakerActions(dispatch);
  return (
    <CTContext.Provider
      value={{
        state,
        ...actions,
      }}
    >
      {children}
    </CTContext.Provider>
  );
};

const CareTakerActions = (dispatch) => {
  async function getDashboardData() {
    const response = await getCareTakerDashboardData();
    console.log("response from getCareTakerDashboardData", response);
    if (response) {
      dispatch({ type: actionTypes.SET_DASHBOARD_DATA, payload: response });
    }
  }

  async function fetchAllCustomers() {
    const response = await getAllCustomers();
    if (response) {
      dispatch({ type: actionTypes.SET_ALL_CUSTOMERS, payload: response });
    }
  }

  async function fetchCurrentCustomers() {
    const response = await getCurrentCustomers();
    if (response) {
      dispatch({ type: actionTypes.SET_CURRENT_CUSTOMERS, payload: response });
    }
  }

  async function fetchPastCustomers() {
    const response = await getPastCustomers();
    if (response) {
      dispatch({ type: actionTypes.SET_PAST_CUSTOMERS, payload: response });
    }
  }

  async function fetchPendingRequests() {
    const response = await getAllPendingRequests();
    if (response) {
      dispatch({ type: actionTypes.SET_PENDING_REQUESTS, payload: response });
    }
  }

  async function updateStatusForCustomer(appointmentId, status) {
    const response = await updateStatusForCustomers(appointmentId, status);
    console.log(response);
  }
  return {
    getDashboardData,
    fetchAllCustomers,
    fetchCurrentCustomers,
    fetchPastCustomers,
    fetchPendingRequests,
    updateStatusForCustomer,
  };
};
