import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getCurrentTime } from "../../helpers/Utils";

import {
  CHAT_GET_CONTACTS,
  CHAT_GET_CONVERSATIONS,
  CHAT_ADD_MESSAGE_TO_CONVERSATION,
  CHAT_CREATE_CONVERSATION,
  LOAD_DEFAULT_QUESTIONS,
  ANSWER_QUESTION,
  ARTICLES_SUCCESS
} from "../actions";

import {
  getContactsSuccess,
  getContactsError,
  getConversationsSuccess,
  getConversationsError,
  getDefaultQuestionSuccess,
  getAnswerQuestionSuccess,
  getArticlesSuccess
} from "./actions";

import contactsData from "../../data/chat.contacts.json";
import conversationsData from "../../data/chat.conversations.json";
import { baseUrl, chatbot, defaultQuestions, answerQuestionRoute, articlesRoute } from "../../constants/defaultValues";

function* loadContacts() {
  try {
    const response = yield call(loadContactsAsync);
    const { contacts, currentUser } = response;
    yield put(getContactsSuccess(contacts, currentUser));
  } catch (error) {
    yield put(getContactsError(error));
  }
}

const loadContactsAsync = async () => {
  const contacts = contactsData.data;
  const currentUser = contacts[0];
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success({ contacts, currentUser });
    }, 2000);
  })
    .then(response => response)
    .catch(error => error);
};

const loadDefaultQuestionsAsync = async (
  currentUserId,
  selectedUserId,
  allConversations
) => {

  const response = await fetch( defaultQuestions );
  const data = await response.json();


  let conversation = allConversations.find(
    x => x.users.includes(currentUserId) && x.users.includes(selectedUserId)
  );

  const time = getCurrentTime();

  if (conversation) {

    for( const  msg of data ){
      
      conversation.messages.push({
        sender: 0,
        time: time,
        text: msg.entry_text,
        id: msg.id
      });

      conversation.lastMessageTime = time;
    }

    let conversations = allConversations.filter(x => x.id !== conversation.id);
    conversations.splice(0, 0, conversation);

    return await new Promise((success, fail) => {
      setTimeout(() => {
        success({ conversations, selectedUser: selectedUserId });
      }, 500);
    })
      .then(response => response)
      .catch(error => error);
  }
}

const loadArticlesAsync = async () => {
  const response = await fetch( articlesRoute );
  const data = await response.json();

  return data;

}

function* loadDefaultQuestions({payload}){

  try {

    const {      
      currentUserId,
      selectedUserId,
      allConversations
    } = payload;

    const questions= yield call(
      loadDefaultQuestionsAsync, 
      currentUserId,
      selectedUserId,
      allConversations,
    );

    const articles = yield call(
      loadArticlesAsync
    )

    yield put( getArticlesSuccess(articles) );
    yield put( getDefaultQuestionSuccess(questions)  );

  } catch (error) {
    
  }

}

function* loadConversations(userId) {
  try {
    const response = yield call(loadConversationsAsync, userId);
    const { conversations, selectedUser } = response;

    const newConversations = yield call(
      loadDefaultQuestionsAsync, 
      0,
      1,
      conversations,
    );

      const articles = yield call(
      loadArticlesAsync
    )

    yield put( getArticlesSuccess(articles) );
    yield put(getConversationsSuccess(newConversations.conversations, selectedUser));

  } catch (error) {
    yield put(getConversationsError(error));
  }
}

const loadConversationsAsync = async ({ payload }) => {
  let conversations = conversationsData.data;
  conversations = conversations.filter(x => x.users.includes(payload));
  const selectedUser = conversations[0].users.find(x => x !== payload);
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success({ conversations, selectedUser });
    }, 1000);
  })
    .then(response => response)
    .catch(error => error);
};

const answerQuestionAsync = async (id) => {

  const response = await fetch( `${answerQuestionRoute}/${id}?format=json`);
  const data = await response.json();

  return data;

}

function* answerQuestion({payload}){

  try {
    
    const {id} = payload.question;

    const answer = yield call(answerQuestionAsync,id);

    yield put( getAnswerQuestionSuccess(answer)  )

  } catch (error) {
    
  }
}


const answerRequestOfArticleAsync = async (requestedProduct, allArticles, allConversations) => {

  
  let response = allArticles
    .filter( article => article.name.toUpperCase() === requestedProduct.toUpperCase() )
    
  response =  response[0];

  
  let conversation = allConversations.find(
    x => x.users.includes(0) && x.users.includes(1)
  );
  
  const time = getCurrentTime();
  
  if (conversation) {
    conversation.messages.push({
      sender: 1,
      time: time,
      text: response ? `${response.name}
      descripciòn: ${response.description}  
      tenemos disponible: ${response.stock}
      cuesta: QE'S ${response.price}`  : "Mi loco dale pa fuera"
    });
    conversation.lastMessageTime = time;
    let conversations = allConversations.filter(x => x.id !== conversation.id);
    conversations.splice(0, 0, conversation);

    return await new Promise((success, fail) => {
      setTimeout(() => {
        success({ conversations});
      }, 500);
    })
      .then(response => response)
      .catch(error => error);
  }

}

function* addMessageToConversation({ payload }) {
  try {
    const {
      currentUserId,
      selectedUserId,
      message,
      allConversations,
      question,
      allArticles
    } = payload;

    const response = yield call(
      addMessageToConversationAsync,
      currentUserId,
      selectedUserId,
      message,
      allConversations,
      question
    );
    const { conversations, selectedUser } = response;
    

    //console.log({conversations, selectedUser});
    yield put(getConversationsSuccess(conversations, selectedUser));


    if(!(message || {}).id && (allArticles || []).length  ){

      
      const answerRequestOfArticle = yield call(
        answerRequestOfArticleAsync,
        message,
        allArticles,
        allConversations
      )
    
        //alert("heereee");
      yield put(getConversationsSuccess(answerRequestOfArticle.conversations, selectedUser));

    }

  } catch (error) {
    //console.log(error);
    yield put(getConversationsError(error));
    
  }
}

const addMessageToConversationAsync = async (
  currentUserId,
  selectedUserId,
  message,
  allConversations,
  question
) => {

  let response, data;

  if(question){
    response = await fetch( `${answerQuestionRoute}/${question.id}?format=json`);
    data = await response.json();
  }


  let conversation = allConversations.find(
    x => x.users.includes(currentUserId) && x.users.includes(selectedUserId)
  );

  const time = getCurrentTime();

  if (conversation) {

    //alert("AA");
    //console.log({question})

    conversation.messages.push({
      sender: question ? currentUserId + 1 : currentUserId,
      time: time,
      text: question ? data[0].output_text : message
    });
    conversation.lastMessageTime = time;
    let conversations = allConversations.filter(x => x.id !== conversation.id);
    conversations.splice(0, 0, conversation);

    return await new Promise((success, fail) => {
      setTimeout(() => {
        success({ conversations, selectedUser: selectedUserId });
      }, 500);
    })
      .then(response => response)
      .catch(error => error);
  }
};

function* createNewConversation({ payload }) {
  try {
    const { currentUserId, selectedUserId, allConversations } = payload;
    const response = yield call(
      createNewConversationAsync,
      currentUserId,
      selectedUserId,
      allConversations
    );
    const { conversations, selectedUser } = response;
    yield put(getConversationsSuccess(conversations, selectedUser));
  } catch (error) {
    yield put(getConversationsError(error));
  }
}

const createNewConversationAsync = async (
  currentUserId,
  selectedUserId,
  allConversations
) => {
  let conversation = {
    id: allConversations.length + 1,
    users: [currentUserId, selectedUserId],
    lastMessageTime: "-",
    messages: []
  };

  allConversations.splice(0, 0, conversation);
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success({
        conversations: allConversations,
        selectedUser: selectedUserId
      });
    }, 500);
  })
    .then(response => response)
    .catch(error => error);
};

export function* watchGetContact() {
  yield takeEvery(CHAT_GET_CONTACTS, loadContacts);
}
export function* watchGetConversation() {
  yield takeEvery(CHAT_GET_CONVERSATIONS, loadConversations);
}
export function* watchAddMessageToConversation() {
  yield takeEvery(CHAT_ADD_MESSAGE_TO_CONVERSATION, addMessageToConversation);
}
export function* watchCreateConversation() {
  yield takeEvery(CHAT_CREATE_CONVERSATION, createNewConversation);
}

export function* watchAnswerQuestion(){
  yield takeLatest(ANSWER_QUESTION, answerQuestion );
}

export function* watchLoadDefaultQuestions(){

  yield takeEvery(LOAD_DEFAULT_QUESTIONS, loadDefaultQuestions);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetContact),
    fork(watchGetConversation),
    fork(watchAddMessageToConversation),
    fork(watchCreateConversation),
    fork(watchLoadDefaultQuestions),
    fork(watchAnswerQuestion)
  ]);
}
