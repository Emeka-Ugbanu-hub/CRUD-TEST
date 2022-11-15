import React,{createContext} from 'react';

// Creating the context object and passing the default values.
const modalContext = createContext({addModal:false,setAdd:()=>{},editModal:false,setEdit:()=>{}});

export default modalContext;
