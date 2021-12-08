import React, {useEffect, useState} from 'react';
import './Quiz.css'
import ActiveQuiz from '../../companents/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from "../../companents/FinishedQuiz/FinishedQuiz";
import Loader from "../../companents/UI/loader/loader";
import {connect} from "react-redux";
import {fetchQuizById} from "../../store/actions/quiz";
import {useParams} from "react-router-dom";



const Quiz = (props) => {

    const params = useParams();
    const quizId = params.id;


    const retryHandler = () => {

    }

    const onAnswerClickHandler = (answerId) => {
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

    useEffect( () => {

        console.log(props)
        props.fetchQuizById(quizId)
    }, [quizId])



        return (

            <div className='Quiz'>

                <div className='QuizWrapper'>
                    <h1>Choose right answer</h1>

                    {props.loading || !props.quiz ? <Loader/>
                        : props.isFinished ? <FinishedQuiz
                                results={props.results}
                                quiz={props.quiz}
                                onRetry={retryHandler}
                            />
                            : <ActiveQuiz
                                answers={props.quiz[props.activeQuestion].answers}
                                question={props.quiz[props.activeQuestion].question}
                                onAnswerClick={onAnswerClickHandler}
                                quizLength={props.quiz.length}
                                answerNumber={props.activeQuestion + 1}
                                state={props.answerState}
                            />
                    }

                </div>
            </div>
        )

}


function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState, //
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    }
}

function mapDispatchToProps(dispatch) {

    return{
        fetchQuizById: id => dispatch(fetchQuizById(id)),
       // quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)