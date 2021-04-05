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
    benefits: [
      {
        id: 1,
        wageId: 1,
        allowanceIds: [1, 2, 3],
        allowances: [],
      },
    ],
    files: [],
  },
  _contracts: [
    {
      id: 1,
      code: 'HD001',
      fullname: 'Hợp đồng lao động ',
      handleDate: '2021-01-10',
      expiredDate: '2022-01-10',
      benefits: [
        {
          id: 1,
          wageId: 1,
          allowanceIds: [1, 2, 3],
          allowances: [],
        },
      ],
      files: [],
    },
  ],
  branches: [],
  wages: [],
  allowances: [],
  benefits: [],
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
        contracts: [],
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

    default:
      return state;
  }
};

export default contractReducer;
