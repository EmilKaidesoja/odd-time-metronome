import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/reducer'

export function configureStore(state) {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, state, composedEnhancers)

  //if (module.hot) {
  // module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  // }
  return store
}

export const state = {
  sections: [{
    firstInterval: 4,
    secondInterval: 4
  }]
}

