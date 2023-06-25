import './App.css';
import React from "react";
import Form from './components/form';

function App() {
  const [state, setState] = React.useState({
      email: "",
      password: "",
      perfil:"",
      birthDate:
      {
        birthDay: "",
        birthMonth: "",
        birthYear:""
      },
      sex:
      {
        male:false,
        female:false,
        noBinary:false,
        other:false,
        notToSay:false
      },
      adwareAgreement:false,
      shareAgreement:false
  });

  return (
    
    <div className="App">
      <Form state={state} setState={setState} />
    </div>
  );
}

export default App;
