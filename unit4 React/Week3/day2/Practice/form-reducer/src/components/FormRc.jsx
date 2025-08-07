import React, { useReducer } from 'react'
const initState = {
  name : "",  
  email: "",
  password : "",
  data: []
}
//data = [{abhi, a@gmail.com}{khushi, k@gmail.com}{mohot}{}]
function formReducerFn(state, {type, value, field}){
  switch(type){
    case "input":
      return {...state, [field] : value };
      case 'submitBtn':
        { let {name, email, password} = state;
        return {...state, data : [...state.data, {name, email, password}]   } }
    default :
    return state
  }
}
const FormRc = () => {
  const [state, dispatch] = useReducer(formReducerFn, initState);
  //handleClick
  function handleClickFn(e){
    return dispatch({
      type : 'input'   ,//input   //inpput
      value : e.target.value, //abhishek //789520
      field : e.target.name  //email //password
    })
  }
  //handleSubmit
  function handleSubmitFn(e){
    e.preventDefault();
   if(state.name && state.email && state.password){
    dispatch({
      type : 'submitBtn'
    })
   }else{
    alert('All Fields are required');
    return;
   }
  }
  return (
    <div>
      <form action="#" onSubmit={(e)=> handleSubmitFn(e)}>   
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={state.name} onChange={(e)=> handleClickFn(e)} />
        <br /><br />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={state.email} onChange={(e)=> handleClickFn(e)}/>
        <br /><br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={state.password} id="password"onChange={(e)=> handleClickFn(e)} />
        <br /><br />
        <input type="submit" value="Submit Form" />
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
           {state.data?.map((ele, idx)=>{
            return <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td>{ele.password}</td>
            </tr>
           })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default FormRc