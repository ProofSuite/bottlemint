let lotion = require('lotion')
let balancesReducer = require('./src/reducers/balances')
// let { combineReducers } = require('redux-tendermint')

let reducerFunction = balancesReducer
let reducer = reducerFunction.toString()

let app = lotion({
  initialState: { reducer },
  logTendermint: false,
  p2pPort: 64339,
  rpcPort: 64340
})

app.use(reducerFunction)
app.start().then((appInfo) => console.log(appInfo))