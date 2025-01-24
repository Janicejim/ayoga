import { YogaNavBar } from "./components/YogaNavBar";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history, IRootState } from "../src/redux/store";
import NoMatch from "../src/components/NoMatch";
import { Home } from "../src/components/Home";
import InfoBox from "../src/components/UserInfoBox";
import { ClassDetails } from "../src/components/Class/ClassDetails";
import Login from "../src/components/Login";

import Packages from "../src/components/Packages";
import Transaction from "../src/components/Transaction";
import CreateClass from "../src/components/CreateClass";
import RegisterAccount from "../src/components/UserRegister";
import PrivateRoute from "../src/components/PrivateRoute";
import OtherClasses from "../src/components/OtherClass";
import { AiGame } from "../src/components/AIgame/AI_game";
import CreditEarned from "../src/components/CreditEarned";
import PaymentResult from "../src/components/PaymentResult";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import AdminPage from "./components/AdminPage";
import ApplyTeacherPage from "./components/ApplyTeacherPage";
import WithdrawCreditPage from "./components/WithdrawCreditPage";
import StudentList from "./components/StudentList";
import TeacherInfoPage from "./components/TeacherInfoPage";
import { FindClass } from "./components/Catalog/FindClass";
import TeacherRevenue from "./components/TeacherRevenue";
import EditUserInfoPage from "./components/EditUserInfoPage";

function App() {
  const { user } = useSelector((state: IRootState) => state.auth);
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <YogaNavBar />

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterAccount} />
          <PrivateRoute path="/create" component={CreateClass} />
          {user.role === "admin" ? (
            <Route path="/" exact={true} component={AdminPage}></Route>
          ) : (
            <Route path="/" exact={true} component={Home}></Route>
          )}

          <PrivateRoute path="/userInfo" component={InfoBox}></PrivateRoute>
          <PrivateRoute
            path="/class/detail/:id"
            component={ClassDetails}
          ></PrivateRoute>

          <PrivateRoute path="/package" component={Packages} />
          <Route path="/transaction" component={Transaction} />
          <Route path="/creditsEarned" component={CreditEarned} />
          <Route path="/aigame" component={AiGame} />
          <Route path="/findClass" component={FindClass} />
          <Route path="/teacherClass/:id" component={OtherClasses} />
          <Route path="/payment/:result/:id" component={PaymentResult} />
          <Route path="/teacher/apply" component={ApplyTeacherPage} />
          <Route path="/withdrawal" component={WithdrawCreditPage} />
          <Route path="/class/student/:id" component={StudentList} />
          <Route path="/teacher/:id" component={TeacherInfoPage} />
          <Route path="/revenue" component={TeacherRevenue} />
          <Route path="/edit/info" component={EditUserInfoPage} />
          <Route component={NoMatch} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
