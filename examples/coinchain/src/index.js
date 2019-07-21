import React from 'react'
import ReactDOM from 'react-dom'
import { createChainStore } from 'redux-tendermint'
import Counter from './components/Counter'

const GCI = '41f8c9814cba45feed38e74f24c848b74c078ab4e46a847c3ba980b6b4a4f07c'

const genesis = {
  "genesis_time": "2019-07-16T17:05:32.601436Z",
  "chain_id": "test-chain-alJqW2",
  "consensus_params": {
    "block": {
      "max_bytes": "22020096",
      "max_gas": "-1",
      "time_iota_ms": "1000"
    },
    "evidence": {
      "max_age": "100000"
    },
    "validator": {
      "pub_key_types": [
        "ed25519"
      ]
    }
  },
  "validators": [
    {
      "address": "FEF84AB0CD51CB7A84CE5CE535B78B499B1B0B8E",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "pTztJXEM+LpiiKNCkvq7Qy4I6cnNst2E1rRT1KcnQew="
      },
      "power": "10",
      "name": ""
    }
  ],
  "app_hash": ""
}

createChainStore(GCI, genesis)
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