import { REDUX_STATE } from '../states';

const initialState = {
  contracts: [],
  contract: {},
  branches: [],
  wages: [],
  allowances: [],
  benefits: [],
  total: 0,
};

const contractReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.contract.SET_CONTRACTS:
      return { ...state, contracts: payload };
    case REDUX_STATE.contract.SET_CONTRACT:
      return { ...state, contract: payload };
    case REDUX_STATE.contract.DELETE_CONTRACT:
      return {
        ...state,
        contracts: state.contracts.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.contract.EMPTY_LIST_CONTRACT:
      return {
        ...state,
        contracts: [],
      };
    case REDUX_STATE.contract.EMPTY_VALUE:
      return {
        ...state,
        contract: {},
      };
    case REDUX_STATE.contract.GET_BRANCHES:
      payload =
        payload && payload.length > 0
          ? payload.map((branch) => ({ id: branch.id ?? 0, name: (branch.name ?? '') + ' - ' + (branch.address ?? ''), branch: branch.name }))
          : [];
      return { ...state, branches: payload };
    case REDUX_STATE.contract.GET_WAGES:
      return {
        ...state,
        wages: payload,
      };
    case REDUX_STATE.contract.GET_ALLOWANCES:
      return {
        ...state,
        allowances: payload,
      };
    case REDUX_STATE.contract.SET_BENEFITS:
      return { ...state, benefits: payload };
    case REDUX_STATE.contract.COUNT_ACTIVE_CONTRACT:
      return { ...state, total: payload };
    default:
      return state;
  }
};

export default contractReducer;
