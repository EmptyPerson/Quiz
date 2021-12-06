import React, {Component} from "react";
import "./QuizCreator.css"
import Button from "../../companents/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../companents/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../companents/UI/Select/Select"
import axios from '../../axios/axios-quiz';

function creatOptionControl(number) {
    return createControl({ label: `Variant ${number}`, errorMessage: 'Statement is not gap', id: number}, {required: true})
}

function createFormControls() {
    return {
        question: createControl({ label: 'Write question', errorMessage: 'Question is not gap'}, {required: true}),
        option1: creatOptionControl(1),
        option2: creatOptionControl(2),
        option3: creatOptionControl(3),
        option4: creatOptionControl(4)
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
}

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = (event) => {
        event.preventDefault()

        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        quiz.push(questionItem)

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createHandler = async (event) => {
        event.preventDefault()

        try {
            await axios.post('/quizes.json', this.state.quiz)

            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            })
        } catch (e) {
            console.log(e)
        }
    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })


    }
    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr />: null }
                </Auxiliary>
            )
        })
    }

    render() {
        const select = <Select
            label="Choose right answer"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />
        return(
            <div className={"QuizCreator"}>
                <div>
                    <h1>Create test</h1>

                    <form onSubmit={this.submitHandler}>

                        { this.renderControls()}

                        {select}

                        <Button
                            type="ButtonPrimary"
                            onClick={this.addQuestionHandler}
                            disabled = {!this.state.isFormValid}
                        >Add quistion</Button>

                        <Button
                            type="ButtonSuccess"
                            onClick={this.createHandler}
                            disabled = {!this.state.quiz.length === 0}
                        >Create test</Button>

                    </form>
                </div>

            </div>
        )
    }
}