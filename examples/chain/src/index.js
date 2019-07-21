import React from 'react'
import ReactDOM from 'react-dom'
import { createChainStore } from 'redux-tendermint'
import Counter from './components/Counter'

const GCI = '68d7a1bc98ac93a3c840dcf007221459e71f4877d04b97ce5d9c1a841157bb11'

createChainStore(GCI)
.then(store => {
  const rootEl = document.getElementById('root')
  let nonce = 0

  const render = () => ReactDOM.render(
    <Counter
      value={store.getState().count}
      onIncrement={() => store.dispatch({ level: 'chain', nonce: ++nonce, type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ level: 'chain', nonce: ++nonce, type: 'DECREMENT' })}
    />,
    rootEl
  )

  render()

  store.subscribe(render)
  store.subscribe(() => console.log('State', store.getState()))
  store.subscribeChain(() => console.log('Chain State', store.getChainState()))
})
