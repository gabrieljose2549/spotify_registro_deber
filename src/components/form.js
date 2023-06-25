import { useState } from 'react';
import './style.css'

const Form = (props) => {
    // Variable de estado del padre
    const {state, setState} = props;
    // Estados para mensajes de error
    const [emailErrorMsj, setEmailErrorMsj] = useState("");
    const [passwordErrorMsj, setPasswordErrorMsj] = useState("");
    const [perfilErrorMsj, setPerfilErrorMsj] = useState("");
    const [birthDayErrorMsj, setBirthDayErrorMsj] = useState("");
    const [birthYearErrorMsj, setbirthYearErrorMsj] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('mes');

    // renderizado condicional
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

    const handleOptionChange = (event) => {
        const valor = event.target.value;
        setSelectedOption(valor);
        verificarGenero(valor);
        setError(false);
    };

    const handleMonthChange = (event) => {
        const monthValue = event.target.value;
        setSelectedMonth(monthValue);
        setState({ ...state, birthDate: { ...state.birthDate, birthMonth: monthValue } });
      };
      

    const verificarGenero = (genero) => {
        switch (genero)
        {
            case 'hombre':
                setState({...state, sex:{...state.sex, male:true}});
                break;
            case 'mujer':
                    setState({...state, sex:{...state.sex, female:true}});
                    break;
            case 'no-binario':
                    setState({...state, sex:{...state.sex, noBinary:true}});
                    break;
            case 'otro':
                setState({...state, sex:{...state.sex, other:true}});
                break;
            case 'no-declarar':
                setState({...state, sex:{...state.sex, notToSay:true}});
                break;
            default:
                console.log("La opción seleccionada no es válida");
        }
    }
    

    const handleEmail = (e) => {
        setState({...state, 'email':e.target.value});
        if (state.email.length < 1)
        {
            setEmailErrorMsj("Es necesario que introduzcas tu email.");
        }
        else
        {
            if (!state.email.includes("@"))
            {
                setEmailErrorMsj("Este email no es válido. Asegúrate de que tenga un formato como este: ejemplo@email.com");
            }
            else
            {
                setEmailErrorMsj("");
            }
        }
    }
    
    const handlePassword = (e) => {
        setState({...state, 'password': e.target.value});

        if (state.password.length === 0)
        {
            setPasswordErrorMsj("Debes introducir una contraseña.");
        }
        else
        {
            if (state.password.length < 7)
            {
                setPasswordErrorMsj("Tu contraseña es muy corta.");
            }
            else
            {
                setPasswordErrorMsj("");
            }
        }
    }

    const handlePerfil = (e) => {
        setState({...state, 'perfil': e.target.value});

        if (state.perfil.length === 0)
        {
            setPerfilErrorMsj("Introduce un nombre para tu perfil.");
        }
        else
        {
            setPerfilErrorMsj("");
        }
    }

    const handleBirthDay = (e) => {
        const valor = e.target.value;
        setState({ ...state, birthDate: { ...state.birthDate, birthDay: valor } });

        if (valor.length === 0 || isNaN(valor))
        {
            setBirthDayErrorMsj("Indica un día del mes válido.");
        }
        else
        {
            if (!isNaN(valor))
            {
                const birthDay_ = parseInt(valor);
                if (birthDay_ >= 32 || birthDay_ < 1)
                {
                    setBirthDayErrorMsj("Indica un día del mes válido.");
                }
                else
                {
                    setBirthDayErrorMsj("");
                }
            }
        }
    }

    const handleAdware = (e) => {
        const valor = e.target.checked;
        setState({...state, adwareAgreement: valor});
    }

    const handleShare = (e) => {
        const valor = e.target.checked;
        setState({...state, shareAgreement: valor});
    }

    const handleBirthYear = (e) => {
        const valor = e.target.value;
        setState({ ...state, birthDate: { ...state.birthDate, birthYear: valor } });

        if (valor.length === 0 || isNaN(valor))
        {
            setbirthYearErrorMsj("Indica un año válido.");
        }
        else
        {
            if (!isNaN(valor))
            {
                const birthYear_ = parseInt(valor);
                if (birthYear_ < 1900)
                {
                    setbirthYearErrorMsj("Indica un año válido.");
                }
                else
                {
                    setbirthYearErrorMsj("");
                }
            }
        }
    }

    const registerHandler = (e) => {
        e.preventDefault();
        setHasBeenSubmitted(true);
        if (selectedOption === '')
        {
            setError(true);
        } else 
        {
            console.log(state);
            resetFields();
        }
    }

    const resetFields = () => {
        setState({
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

    }

    const formMessage = () => {
        if (hasBeenSubmitted)
        {
            return "¡Gracias Por Registrarte!";
        }
        else
        {
            return "¡Bienvenido, registrate por favor!";
        }
    }

    return (
        <div>
            <div className="cabecera">
                <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="logo_spotify"/>
                <h2>Regístrate gratis para escuchar</h2>
                <button className="registro-fb">Regístrate con Facebook</button>
                <button className="registro-google">Regístrate con Google</button>
            </div>
            <div className="formulario">
                <form onSubmit={registerHandler}>
                    <div className="input">
                        <div className="input-text-cero">
                            <label htmlFor="email">¿Cuál es tu email?</label>
                        </div>
                        <div className="input-text-uno">
                            <input className="caja-texto" type="text" name="email" size={30} placeholder="Introduce tu email." onChange={handleEmail} value={state.email}/>
                        </div>
                        <div className="input-text-dos">
                            <span className="error-mensaje">
                                <p><i className="fa-sharp fa-solid fa-circle-exclamation"></i>{emailErrorMsj}</p>
                            </span>
                        </div>
                    </div>            
                    
                    <div className="input">
                        <div className="input-text-cero">
                            <label htmlFor="perfil">¿Cómo quieres que te llamemos?</label>
                        </div>
                        <div className="input-text-uno">
                            <input className="caja-texto" type="text" name="perfil" value={state.perfil} onChange={handlePerfil} size={30} placeholder="Introduce un nombre de perfil."/>
                        </div>
                        <div className="input-text-dos">
                            <span className="error-mensaje">
                                <p><i className="fa-sharp fa-solid fa-circle-exclamation"></i>{perfilErrorMsj}</p>
                            </span>
                        </div>
                    </div>

                    <div className="input">
                        <div className="input-text-cero">
                            <label htmlFor="password">Crea una contraseña</label>
                        </div>
                        <div className="input-text-uno">
                            <input className="caja-texto" type="password" name="password" value={state.password} size={30} onChange={handlePassword} placeholder="Crea una contraseña."/>
                        </div>
                        <div className="input-text-dos">
                            <span className="error-mensaje">
                                <p><i className="fa-sharp fa-solid fa-circle-exclamation"></i>{passwordErrorMsj}</p>
                            </span>
                        </div>
                    </div>

                    <div className="input">
                        <div className="input-text-cero">
                            <label htmlFor="nacimiento">¿Cuál es tu fecha de nacimiento?</label>
                        </div>
                    </div>

                    <div className="select-nacimiento">
                        <div className="input" id="nacimiento-menor">
                            <div className="input-nacimiento-cero">
                                <label htmlFor="dia-nacimiento-lbl">Día</label>
                            </div>
                            <div className="input-nacimiento-uno">
                                <input className="caja-texto" type="text" name="dia-nacimiento-lbl" placeholder="DD" maxLength="2" onChange={handleBirthDay} value={state.birthDate.birthDay}/>
                            </div>
                        </div>

                        <div className="input" id="nacimiento-medio">
                            <div className="input-nacimiento-cero">
                                <label htmlFor="mes-nacimiento-lbl">Mes</label>
                            </div>
                            <div className="input-nacimiento-mes">
                                <select name="mes-nacimiento-lbl" value={selectedMonth} onChange={handleMonthChange}>
                                    <option disabled value="mes">Mes</option>
                                    <option value="enero">Enero</option>
                                    <option value="febrero">Febrero</option>
                                    <option value="marzo">Marzo</option>
                                    <option value="abril">Abril</option>
                                    <option value="mayo">Mayo</option>
                                    <option value="junio">Junio</option>
                                    <option value="julio">Julio</option>
                                    <option value="agosto">Agosto</option>
                                    <option value="septiembre">Septiembre</option>
                                    <option value="octubre">Octubre</option>
                                    <option value="noviembre">Noviembre</option>
                                    <option value="diciembre">Diciembre</option>
                                </select>                          
                            </div>
                        </div>

                        <div className="input" id="nacimiento-mayor">
                            <div className="input-nacimiento-cero">
                                <label htmlFor="anio-nacimiento-lbl">Año</label>
                            </div>
                            <div className="input-nacimiento-uno">
                                <input className="caja-texto" type="text" name="anio-nacimiento-lbl" placeholder="AAAA" maxLength="4" value={state.birthDate.birthYear} onChange={handleBirthYear}/>
                            </div>
                        </div>
                    </div>

                    <div className="input">
                        <div className="input-text-dos">
                            <span className="error-mensaje">
                                <p><i className="fa-sharp fa-solid fa-circle-exclamation"></i>{birthDayErrorMsj}</p>
                                <p><i className="fa-sharp fa-solid fa-circle-exclamation"></i>{birthYearErrorMsj}</p>
                            </span>
                        </div>
                    </div>

                    <div className="input">
                        <div className="input-text-cero">
                            <label htmlFor="perfil">¿Cuál es tu sexo?</label>
                        </div>
                    </div>

                    <div className="input-sexo">
                        <label>
                            <input type="radio" id="sexo-masculino" name="genero" value="hombre" checked={selectedOption === 'hombre'} onChange={handleOptionChange} />
                            Hombre
                        </label>

                        <label>
                            <input type="radio" id="sexo-femenino" name="genero" value="mujer" checked={selectedOption === 'mujer'} onChange={handleOptionChange} />
                            Mujer
                        </label>

                        <label>
                            <input type="radio" id="sexo-no-binario" name="genero" value="no-binario" checked={selectedOption === 'no-binario'} onChange={handleOptionChange} />
                            No Binario
                        </label>

                        <label>
                            <input type="radio" id="sexo-otro" name="genero" value="otro" checked={selectedOption === 'otro'} onChange={handleOptionChange} />
                            Otro
                        </label>

                        <label>
                            <input type="radio" id="sexo-no-decir" name="genero" value="no-declarar" checked={selectedOption === 'no-declarar'} onChange={handleOptionChange} />
                            Prefiero no decirlo
                        </label>
                    </div>

                    <div className="input">
                        <div className="input-text-dos">
                            <span className="error-mensaje">
                                {error && <p>Por favor, elige al menos una opción.</p>}
                            </span>
                        </div>
                    </div>

                    <div className="input">
                        <div className="input-text-cero">
                            <input type="checkbox" id="publicidad-spotify" onChange={handleAdware} checked={state.adwareAgreement}/>
                            <label htmlFor="publicidad-spotify">Prefiero no recibir publicidad de Spotify</label>
                        </div>

                        <div className="input-text-cero">
                            <input type="checkbox" id="compartir-spotify" onChange={handleShare} checked={state.shareAgreement}/>
                            <label htmlFor="compartir-spotify">Compartir mis datos de registro con los proveedores de contenido de Spotify para fines de marketing.</label>
                        </div>

                    </div>

                    <div className="fin-formulario">
                        <input className="registro-spotify" type="submit" value="Register"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;