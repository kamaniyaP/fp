import React, { useState } from 'react';
import { postData } from '../lib/request';
import AnsModal from './AnsModal';

const Answer = ({ answer }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: answer }} />
    );
};

const Question = ({ question }) => {
    const [showAnswers, setShowAnswers] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [showAnsModal, setShowAnsModal] = useState(false);

    const handleShowAnswers = async () => {
        if (!showAnswers) {
            postData('/api/getAnswers', { id: question.user_id, sub_time: question.submission_time }).then(data => {
                setAnswers(data.data)
            })
        }
        setShowAnswers(!showAnswers);
    };

    return (
        <div >

            <div className='grid grid-cols-2 space-x-4 border-4 border-blue-500 px-32 py-5 my-5 justify-items-stretch rounded-2xl'>
                <div className='justify-self-start'><h2 className='py-1 font-semibold'>{question.question}</h2></div>
                <div className='justify-self-end'>
                    <button className=' border-2 border-blue-500  text-blue-500 rounded-full px-5 py-1 mb-2 text-sm content' onClick={handleShowAnswers}>{showAnswers ? 'Hide Answers' : 'Show Answers'}</button>&emsp;
                    <button className=" border-2 border-blue-500  text-blue-500 rounded-full px-5 py-1 mb-2 text-sm" onClick={() => setShowAnsModal(true)}>Answer</button>
                </div>
            </div>
            {showAnswers && answers.map((answer, index) => (
                <div className='font-semibold space-x-2 border-2 border-blue-500 px-32 my-2 rounded-2xl'>
                    <Answer key={index} answer={answer.answer} />
                </div>
            ))}

            <AnsModal isVisible={showAnsModal} onClose={() => setShowAnsModal(false)} q_user_id={question.user_id} q_time={question.submission_time} />
        </div>
    );
};

const QuestionsList = ({ questions, isVisible }) => {
    if (!isVisible) return null
    return (
        <div>
            {questions.map((question, index) => (
                <Question key={index} question={question} />
            ))}
        </div>
    );
};

export default QuestionsList;