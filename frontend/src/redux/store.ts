import { IUserInfoAction } from "./userInfo/actions";
import { userInfoReducers } from "./userInfo/reducers";
import { IUserInfoBoxState } from "./userInfo/state";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
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




export const history = createBrowserHistory();

// 1. Combining State by Composition

export type IRootThunkDispatch = ThunkDispatch<IRootState, null, IRootAction>;

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose | undefined;
  }
}

export interface IRootState {
  userInfo: IUserInfoBoxState;
  router: RouterState;
  auth: IAuthState;
}

// 2. Combining Actions by Union
type IRootAction =
  | CallHistoryMethodAction
  | IAuthAction
  | IUserInfoAction




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 3. Combining Reducers by the function combineReducer()
const rootReducer = combineReducers<IRootState>({
  userInfo: userInfoReducers,
  router: connectRouter(history),
  auth: authReducers,
});

const store = createStore<IRootState, IRootAction, {}, {}>(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history))
  )
);
export default store;
