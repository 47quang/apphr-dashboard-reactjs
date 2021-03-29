import { REDUX_STATE } from '../states';

const initialState = {
  contracts: [],
  contract: {
    id: 1,
    isMinimize: false,
    isOpen: true,
    code: '',
    type: '',
    pTaxType: '',
    signee: '',
    typeWork: 0,
    probTime: 0,
    handleDate: '',
    validDate: '',
    expiredDate: '',
    branchId: 0,
    startWork: '',
    paymentType: 0,
    salaryGroup: 0,
    salary: 0,
    allowance: [],
    files: [],
  },
};

const contractReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.contract.SET_CONTRACTS:
      return { ...state, contracts: payload };
    case REDUX_STATE.contract.SET_CONTRACT:
      return { ...state, contract: Object.assign({}, state.contract, payload) };
    case REDUX_STATE.contract.DELETE_CONTRACT:
      return {
        ...state,
        contracts: state.contracts.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.contract.EMPTY_VALUE:
      return {
        ...state,
        contract: initialState.contract,
      };
    default:
      return state;
  }
};

export default contractReducer;
