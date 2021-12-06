import React, {Component} from 'react';
import './Quiz.css'
import ActiveQuiz from '../../companents/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from "../../companents/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../companents/UI/loader/loader";


class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })
            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
    }

}
    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            isFinished: false,
            answerState: null,
            results: {}
        })
    }

    async componentDidMount() {

        try {
            //const params = useParams();
            const response = await axios.get(`/quizes/${this.props.match}.json`) //this.props.match.params.id
            const quiz = response.data

            this.setState({
                quiz,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }

    }

    render() {

        return (

            <div className='Quiz'>

                <div className='QuizWrapper'>
                    <h1>Choose right answer</h1>

                    {this.state.loading ? <Loader/>
                    : this.state.isFinished ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz