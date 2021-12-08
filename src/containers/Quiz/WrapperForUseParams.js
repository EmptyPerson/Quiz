import React from 'react';
import {useParams} from "react-router-dom";
import Quiz from "./Quiz";

const SubQuiz = () => {
    const params = useParams();
    const quizId = params.id;

    return (<Quiz match = {quizId}/>)
}

export default SubQuiz