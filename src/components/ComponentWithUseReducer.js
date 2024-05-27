import { useReducer} from "react"


const reducer = (state, action) => {
    switch(action.type){
        case 'DEPOSIT':
            return state + action.payload
        case 'WITHDRAW':
            return state - action.payload
        default:
            return state
    }

}

export default function ComponentWithUseReducer () {

    const deposit = (kwota1) => {
            dispatch({
                type: 'DEPOSIT',
                payload: kwota1
            })
        }


    const withdraw = (kwota2) => {
            dispatch({
                type: 'WITHDRAW',
                payload: kwota2,
                
            })
        }

    const [amount, dispatch] = useReducer(reducer, 500);


    return(

    <div>
        <h1>To jest reducer z payload</h1>
        <h1>{amount}</h1>
        <button onClick={() => deposit(700)}>
            Deposit
        </button>
        <button onClick={()=> withdraw(200)}>
            Withdraw
        </button>
    
    </div>
    )
}


