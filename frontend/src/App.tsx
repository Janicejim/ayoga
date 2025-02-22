import { YogaNavBar } from "./components/YogaNavBar";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history, IRootState } from "../src/redux/store";
import NotFindPage from "./pages/404Page";
import Homepage from "./pages/Homepage";
import UserInfoPage from "./pages/UserInfoPage";
import ClassDetailPage from "./pages/ClassDetailPage";
import LoginPage from "./pages/LoginPage";
import PackagesPage from "./pages/PackagesPage";
import Transaction from "./pages/TransactionPage";
import CreateClassPage from "./pages/CreateClassPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import AiGamePage from "./pages/AIGamePage";
import PaymentResult from "./components/PaymentResult";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import AdminPage from "./pages/AdminPage";
import ApplyTeacherPage from "./pages/ApplyTeacherPage";
import WithdrawalCreditPage from "../src/pages/WithdrawalCreditPage";
import StudentListPage from "./pages/StudentListPage";
import TeacherInfoPage from "./pages/TeacherInfoPage";
import FindClassPage from "./pages/FindClassPage";
import TeacherRevenuePage from "./pages/TeacherRevenuePage";
import EditUserInfoPage from "./pages/EditUserInfoPage";
import Footer from "./components/Footer";

function App() {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <YogaNavBar />
        <div className="app-container">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute path="/class/create" component={CreateClassPage} />
            {user.role === "admin" ? (
              <Route path="/" exact={true} component={AdminPage}></Route>
            ) : (
              <Route path="/" exact={true} component={Homepage}></Route>
            )}

            <PrivateRoute path="/info" component={UserInfoPage}></PrivateRoute>
            <PrivateRoute
              path="/class/detail/:id"
              component={ClassDetailPage}
            ></PrivateRoute>

            <PrivateRoute path="/package" component={PackagesPage} />
            <PrivateRoute path="/transaction" component={Transaction} />
            <PrivateRoute path="/ai" component={AiGamePage} />
            <Route path="/class/find" component={FindClassPage} />
            <PrivateRoute path="/payment/:result/:id" component={PaymentResult} />
            <PrivateRoute path="/teacher/apply" component={ApplyTeacherPage} />
            <PrivateRoute path="/credit/withdrawal" component={WithdrawalCreditPage} />
            <PrivateRoute path="/class/student/:id" component={StudentListPage} />
            <Route path="/teacher/:id" component={TeacherInfoPage} />
            <PrivateRoute path="/revenue" component={TeacherRevenuePage} />
            <PrivateRoute path="/edit/info" component={EditUserInfoPage} />
            <Route component={NotFindPage} />
          </Switch>
        </div>
        <div>  <Footer /></div>

      </ConnectedRouter>
    </div>
  );
}

export default App;
