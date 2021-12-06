import Layout from "./hoc/Layout/layout";
import {Route, Routes} from "react-router-dom";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import SubQuiz from "./containers/Quiz/WrapperForUseParams";


function App() {
  return (
    <Layout>
        <Routes>
            <Route path="/auth" element={<Auth/>} />
            <Route path="/quiz-creator" element={<QuizCreator/>} />
            <Route path="/quiz/:id" element={<SubQuiz/>} />
            <Route path="/" element={<QuizList/>} />
        </Routes>
    </Layout>
  );
}

export default App;
