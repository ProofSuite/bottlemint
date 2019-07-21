# Bottlemint
Bottlemint (Redux Tendermint, as if in a bottle) is a blockchain-backed state container for the creation of decentralized clients.  This library connects to a Lotion.js/Tendermint chain which act as the state for multiple frontends.  This was originally forked from [The Redux Project](https://github.com/reduxjs/redux).

Redux is a predictable state container for JavaScript apps.  By combining it with a decentralized datastore, clientside developers can both experiment and help to develop fully decentralized websites and clients.

The Bottlemint package is a modified version of redux that synchronizes state between your frontend redux application and your tendermint chain.

Redux and Tendermint are both state machines that update a state through a state function.
- In the case of tendermint, the state function is usually noted `(state, tx) => state`
- In the case of redux, the state function is usually written `(state, action) => state`

Bottlemint allows your frontend to use the same state function (`=reducer`) as a lotion tendermint chain. Your frontend state can now be stored, without the need to set up a database, in a decentralized chain.

If combined with an IPFS or Meshnet solution, sites powered by Redux Tendermint can become completely decentralized.

This repository is currently under development and we welcome any feedback.  

# Overview
1) Write reducers as you usually write them in your react applications 

```
function counterReducer(state, tx) {
  let { type } = tx
  switch (type) {
    case 'INCREMENT':
        return { ...state,
          counter: {
            ...state.counter,
            count: state.counter.count + 1
          }
        }
    case 'DECREMENT':
        return { ...state,
          counter: {
            ...state.counter,
            count: state.counter.count - 1
          }
        }
    default:
        return state
  }
}

module.exports = counterReducer
```
2) Use this reducer to update your tendermint chain state

```
let app = lotion({
  initialState: {
    counter: {
      count: 0
    }
  },
  p2pPort: 64339,
  rpcPort: 64340
})

app.use(counterReducer)
```
3) You can import the same reducer from your chain application to your frontend application. 
Your frontend state and your chain state are now connected.

```
import React from 'react'
import ReactDOM from 'react-dom'
import { createChainStore } from 'Bottlemint'
import { reducer } from '@proofsuite/counterchain'
import { genesis, chainId } from './config.json'
import Counter from './components/Counter'


createChainStore(reducer, chainId, genesis).then(store => {
  const render = () => ReactDOM.render(
    <Counter
      value={store.getState().counter.count}
      onIncrement={() => store.dispatch({ level: 'chain', type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ level: 'chain', type: 'DECREMENT' })}
    />,
    document.getElementById('root')
  )

  render()

  store.subscribe(render)
```
  
# Use Cases

By utilizing the existing infrastructure of a Tendermint blockchain, we can create websites utilizing a shared state without the use of a centralized server.

If paired with an Application specific blockchain such as those built on the Cosmos SDK, this state sharing system has the potential to be highly scalable and easily accessible for anyone building web clients.  

# Demos
Multiple demos can be found on our repository and we plan on adding a quick deploy system for Cosmos-SDK nodes as well as a sample of what can be done with a data-relay Application specific Cosmos chain.  

[Counter Demo](https://github.com/ProofSuite/react-lotion-counter-app)

This Counter React Application demonstrates a simple React application updating a global state between different clients.

[Token Transfer Demo](https://github.com/ProofSuite/react-lotion-token-app)

This Token Transfer Demo shows how assets can be transferred and  monitored between different clients sharing a global state.

# TODO

* Update name to something cooler and that David likes better
* Containerize Demos for easy deploy
* Split State between UI state and Blockchain state
* Build demo app showcasing the use of `combineReducers()`
* Replace polling updates with Tendermint subscription updates
* Demonstrate and test non-react implementations
* Clean up code and document for new blockchain devs
* Write tests :(