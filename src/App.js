import Layout from "./hoc/Layout/layout";
import {Navigate, Route, Routes} from "react-router-dom";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import SubQuiz from "./containers/Quiz/WrapperForUseParams";
import {connect} from "react-redux";
import Logout from './companents/Logout/Logout'
import {autoLogin} from "./store/actions/auth";
import {useEffect} from "react";
//import Quiz from "./containers/Quiz/Quiz";
//import Quiz from "./containers/Quiz/functionQuizComponent";


function App(props) {
    let routes = (
        <Routes>
            <Route path="/auth" element={<Auth/>} />
            <Route path="/quiz/:id" element={<SubQuiz/>} />
            {/*<Route path="/logout" element={Logout}/>*/}
            <Route path="/" exact={'true'} element={<QuizList/>} />
        </Routes>
    )
    if (props.isAuthenticated) {
        routes = (
            <Routes>
                <Route path="/quiz-creator" element={<QuizCreator/>} />
                <Route path="/quiz/:id" element={<SubQuiz/>} />
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/" exact={'true'} element={<QuizList/>} />
                <Route path="/auth" element={<Navigate replace to="/" />} />

            </Routes>
        )
    }

    useEffect( () => {

        props.authLogin()
        }
    )

  return (
    <Layout>
        {routes}
    </Layout>
  );
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authLogin: () => dispatch(autoLogin())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
