import { IUserInfoAction } from "./userInfo/actions";
import { userInfoReducers } from "./userInfo/reducers";
import { IUserInfoBoxState } from "./userInfo/state";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { IRegisterAction } from "./registerAccount/actions";
import { registerReducers } from "./registerAccount/reducers";
import { IRegisterState } from "./registerAccount/state";
import thunk, { ThunkDispatch } from "redux-thunk";

import {
  RouterState,
  connectRouter,
  routerMiddleware,
  CallHistoryMethodAction,
} from "connected-react-router";
import { createBrowserHistory } from "history";
import { IAuthAction } from "./auth/actions";
import { authReducers } from "./auth/reducers";
import { IAuthState } from "./auth/state";
import { IPackageAction } from "./packages/actions";
import { IPackageState } from "./packages/state";
import { packageReducers } from "./packages/reducers";
import { IClassOtherClassState, classDetailsState } from "./class/state";
import { classDetailsReducer, classOtherClassReducers } from "./class/reducers";
import { IClassDetailsAction } from "./class/actions";
import { ITransactionInfoState } from "./transaction/state";
import { ITransactionAction } from "./transaction/actions";
import { transactionReducers } from "./transaction/reducers";
import { IOtherClassState } from "./otherClass/state";
import { IOtherClassAction } from "./otherClass/actions";
import { otherClassReducers } from "./otherClass/reducers";


export const history = createBrowserHistory();

// 1. Combining State by Composition

export type IRootThunkDispatch = ThunkDispatch<IRootState, null, IRootAction>;

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export interface IRootState {
  userInfo: IUserInfoBoxState;
  router: RouterState;
  auth: IAuthState;
  classDetails: classDetailsState;
  registerAccount: IRegisterState;
  packages: IPackageState;
  transaction: ITransactionInfoState;
  otherClass: IOtherClassState;
  classOtherClass: IClassOtherClassState;

}

// 2. Combining Actions by Union
type IRootAction =
  | CallHistoryMethodAction
  | IAuthAction
  | IUserInfoAction
  | IPackageAction
  | IClassDetailsAction
  | ITransactionAction
  | IRegisterAction
  | IOtherClassAction


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 3. Combining Reducers by the function combineReducer()
const rootReducer = combineReducers<IRootState>({
  userInfo: userInfoReducers,
  router: connectRouter(history),
  auth: authReducers,
  classDetails: classDetailsReducer,
  registerAccount: registerReducers,
  packages: packageReducers,
  transaction: transactionReducers,
  otherClass: otherClassReducers,
  classOtherClass: classOtherClassReducers,
});

const store = createStore<IRootState, IRootAction, {}, {}>(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
);
export default store;
