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
    wageId: 0,
    amount: 0,
    allowance: [],
    files: [],
  },
  branches: [],
  wages: [{ id: 0, name: 'Chọn nhóm lương' }],
  allowances: [{ id: 0, name: 'Chọn phụ cập', amount: 0 }],
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
    case REDUX_STATE.contract.GET_BRANCHES:
      payload =
        payload && payload.length > 0
          ? payload.map((branch) => ({ id: branch.id ?? 0, name: (branch.name ?? '') + ' - ' + (branch.address ?? ''), branch: branch.name }))
          : [];
      console.log('branches', payload);
      return { ...state, branches: payload };
    case REDUX_STATE.contract.GET_WAGES:
      payload && payload.length >= 0 && payload.splice(0, 0, { id: 0, name: 'Chọn nhóm lương', amount: 0 });
      return {
        ...state,
        wages: payload,
      };
    case REDUX_STATE.contract.GET_ALLOWANCES:
      payload.splice(0, 0, { id: 0, name: 'Chọn phụ cập', amount: 0 });
      return {
        ...state,
        allowances: payload,
      };
    default:
      return state;
  }
};

export default contractReducer;
