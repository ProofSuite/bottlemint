let lotion = require('lotion')

function reducerFunction(state, tx) {
  switch (tx.type) {
    case 'INCREMENT':
        if (typeof tx.nonce === 'undefined') return state
        state.count++;
        return state
    case 'DECREMENT':
        if (typeof tx.nonce === 'undefined') return state
        state.count--;
        return state
    default:
        return state
  }
}

let reducer = reducerFunction.toString()

let app = lotion({
  initialState: {
    count: 0,
    reducer,
  },
  logTendermint: false,
  p2pPort: 64339,
  rpcPort: 64340
})


app.use(reducerFunction)
app.start().then((appInfo) => console.log(appInfo))