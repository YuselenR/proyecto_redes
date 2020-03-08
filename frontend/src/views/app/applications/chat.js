import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Row } from "reactstrap";

import { Colxx } from "../../../components/common/CustomBootstrap";

import {
  getContacts,
  getConversations,
  changeConversation,
  addMessageToConversation,
  getDefaultQuestions
} from "../../../redux/actions";
import ChatHeading from "../../../components/applications/ChatHeading";
import MessageCard from "../../../components/applications/MessageCard";
import SaySomething from "../../../components/applications/SaySomething";
import QuestionCard from "../../../components/applications/QuestionCard";

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActiveTab: "messages",
      messageInput: ""
    };
  }

  componentDidMount() {
    const currentUserId = 0;
    this.props.getContacts();
    this.props.getConversations(currentUserId);
    
    /*this.props.getDefaultQuestions(
      currentUserId,
      currentUserId,
      this.props.chatApp.conversations
    );*/

  }

  componentDidUpdate() {
    if (
      this.props.chatApp.loadingConversations &&
      this.props.chatApp.loadingContacts &&
      this.props.chatApp.selectedUser == null
    ) {
      this.props.changeConversation(1);
    }

    if (this._scrollBarRef) {
      this._scrollBarRef._ps.element.scrollTop = this._scrollBarRef._ps.contentHeight;
    }
  }

  handleChatInputPress = e => {
    if (e.key === "Enter") {
      if (this.state.messageInput.length > 0) {
        this.props.addMessageToConversation(
          this.props.chatApp.currentUser.id,
          this.props.chatApp.selectedUser.id,
          this.state.messageInput,
          this.props.chatApp.conversations,
          null, 
          this.props.chatApp.allArticles
        );
        this.setState({
          messageInput: "",
          menuActiveTab: "messages"
        });
      }
    }
  };

  handleChatInputChange = e => {
    this.setState({
      messageInput: e.target.value
    });
  };

  handleSendButtonClick = () => {
    if (this.state.messageInput.length > 0) {
      this.props.addMessageToConversation(
        this.props.chatApp.currentUser.id,
        this.props.chatApp.selectedUser.id,
        this.state.messageInput,
        this.props.chatApp.conversations,
        null,
        this.props.chatApp.allArticles
      );
      this.setState({
        messageInput: "",
        menuActiveTab: "messages"
      });
    }
  };

  toggleAppMenu = tab => {
    this.setState({
      menuActiveTab: tab
    });
  };

  render() {
    const {
      allContacts,
      conversations,
      loadingConversations,
      loadingContacts,
      currentUser,
      selectedUser,
      loadingDefaultQuestions,
      defaultQuestions,
      articles
    } = this.props.chatApp;

    const { menuActiveTab, messageInput } = this.state;
    const { messages } = this.props.intl;

    const selectedConversation =
      loadingConversations && loadingContacts && selectedUser
        ? conversations.find(
            x =>
              x.users.includes(currentUser.id) &&
              x.users.includes(selectedUser.id)
          )
        : null;

      //console.log({loadingConversations, loadingContacts})
    return loadingConversations && loadingContacts ? (
      <Fragment>
        <Row className="app-row">
          <Colxx xxs="12" className="chat-app">
            {loadingConversations && selectedUser && (
              <ChatHeading
                name={selectedUser.name}
                thumb={selectedUser.thumb}
                lastSeenDate={selectedUser.lastSeenDate}
              />
            )}

            {selectedConversation && (
              <PerfectScrollbar
                ref={ref => {
                  this._scrollBarRef = ref;
                }}
                containerRef={ref => {}}
                option={{ suppressScrollX: true, wheelPropagation: false }}
              >
                {selectedConversation.messages.map((item, index) => {
                  const sender = allContacts.find(x => x.id === item.sender);

                  if(item.id){
                    return(
                      <QuestionCard
                        key = {index}
                        sender = {sender}
                        question = {item}
                        currentUserid={currentUser.id}
                      />
                    )
  
                  }

                  return (
                    <MessageCard
                      key={index}
                      sender={sender}
                      item={item}
                      currentUserid={currentUser.id}
                    />
                  );
                })}
                {defaultQuestions.map( (question,index) => {
                  let sender;
                  selectedConversation.messages.map((item) => {
                      sender = allContacts.find(x => x.id === item.sender);
                  });

                  return(
                    <QuestionCard
                      key = {index}
                      sender = {sender}
                      question = {question}
                      currentUserid={currentUser.id}
                    />
                  )

                })}


              </PerfectScrollbar>
            )}
          </Colxx>
        </Row>
        <SaySomething
          placeholder={messages["chat.saysomething"]}
          messageInput={messageInput}
          handleChatInputPress={this.handleChatInputPress}
          handleChatInputChange={this.handleChatInputChange}
          handleSendButtonClick={this.handleSendButtonClick}
        />
      </Fragment>
    ) : (
      <div className="loading" />
    );
  }
}

const mapStateToProps = ({ chatApp }) => {
  return { chatApp };
};

export default injectIntl(
  connect(
    mapStateToProps,
    {
      getContacts,
      getConversations,
      changeConversation,
      addMessageToConversation,
      getDefaultQuestions
    }
  )(ChatApp)
);

