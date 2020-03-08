import { all } from 'redux-saga/effects';
import chatSagas from './chat/saga';

export default function* rootSaga(getState) {
  yield all([
    chatSagas()
  ]);
}
