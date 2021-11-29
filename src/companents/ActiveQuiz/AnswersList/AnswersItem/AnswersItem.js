import React from "react"
import  './AnswersItem.css'

const AnswersItem = props => {

    const cls = ['AnswersItem']

    if (props.state === 'error') {
        cls.push('AnswersItem: error')
    } else if (props.state === 'success') {
        cls.push('AnswersItem: success')
    }

    return (
        <li className={cls.join(' ')}
        onClick={() => props.onAnswerClick(props.answers.id)}
        >
            {props.answers.text}
        </li>
    )
}

export default AnswersItem