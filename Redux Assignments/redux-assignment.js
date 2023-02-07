const redux = require('redux');

const counterReducer = (state = {counter: 0}, action) => {
    if(action.type == 'increment'){
        return {
            counter: state.counter + 1
        }; 
    }else if (action.type == 'decrement'){
        return {
            counter: state.counter - 1
        }; 
    }else if(action.type == 'incrementByFive'){
        return {
            counter: state.counter + 5 
        }; 
    }
};
const store = redux.createStore(counterReducer);

console.log(store.getState());

const counterSubscriber = () => {
    const latestState = store.getState(); 
    console.log(latestState);
}

store.subscribe(counterSubscriber); 


store.dispatch({type: 'increment'}); 
store.dispatch({type: 'increment'}); 
store.dispatch({type: 'increment'}); 
store.dispatch({type: 'increment'}); 
store.dispatch({type: 'increment'}); 
store.dispatch({type: 'decrement'}); 
store.dispatch({type: 'incrementByFive'});
