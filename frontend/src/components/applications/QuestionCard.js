import React, { Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import { getAnswerQuestion, addMessageToConversation } from "../../redux/actions";
import { connect } from "react-redux";

const QuestionCard = (props) => {

const {
  sender,
  question, 
} = props;

const {

    allContacts,
    conversations,
    loadingConversations,
    loadingContacts,
    currentUser,
    selectedUser,
    loadingDefaultQuestions,
    defaultQuestions,
    item , 
    currentUserid

} = props.chatApp;


const handleQuestionClick = () => {
    props.addMessageToConversation(
        props.chatApp.currentUser.id,
        props.chatApp.selectedUser.id,
        question.entry_text,
        props.chatApp.conversations,
        question
    );

};


  return (
    <Fragment>
      <Card
        className={`d-inline-block mb-3 float-${
          "right"
        }`}
      >
        <div className="position-absolute  pt-1 pr-2 r-0">
          <span className="text-extra-small text-muted">{question.time}</span>
        </div>
        <CardBody>
          <div className={ (sender || {}).thumb ? "chat-text-left" : "p-1"}>
            <div onClick = {() => handleQuestionClick()}  className="question  mb-0 text-semi-muted">{question.text}</div>
          </div>
        </CardBody>
      </Card>
      <div className="clearfix" />
    </Fragment>
  );
};

const mapStateToProps = ({chatApp}) => {

    return ({chatApp});

};

const mapActionsToProps = {
    getAnswerQuestion,
    addMessageToConversation    
}


export default connect(mapStateToProps , mapActionsToProps )(QuestionCard);
