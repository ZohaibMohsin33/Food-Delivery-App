import React,{createContext,useContext,useReducer} from "react";



const reducer = (state,action)=>{

    switch(action.type){
        case "ADD": return [...state,{id:action.id,name:action.name,size:action.size,qty:action.qty,price : action.price}];
        case "REMOVE" : 
        let newArr = [...state];
        newArr.splice(action.index,1);
        return newArr;

        case "DROP":
            let emptArr = [];
            return emptArr;

        default : console.log("Error in progress");
    }

}

const CartStateContext    = createContext();
const CartDispatchContext = createContext();

export const CartProvider = ({children}) =>{

    const [state,dispatch] = useReducer(reducer,[]);

    return(
     <CartStateContext.Provider value={state}>
        <CartDispatchContext.Provider value={dispatch}>
            {children}
        </CartDispatchContext.Provider>
     </CartStateContext.Provider>

    )
}

export const useCart     = ()=> useContext(CartStateContext);
export const useDispatch = ()=> useContext(CartDispatchContext);