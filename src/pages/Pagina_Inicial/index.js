import React, {Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './pagina_inicail.css';




function MainPage() {
    
    const [location, setLocation] = useState(false);
    const [weather, setWeather] = useState(false);

    let getWeather = async (lat, lon) => {
        let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                lat: lat,
                lon: lon,
                appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
                lang: 'pt_br',
                units: 'metric'
            }
        });
        setWeather(res.data);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude);
            setLocation(true)
        })
    }, [])


    if (location === false) {
        return (
            <div>
                <div className="menuclima">
                    <Fragment>
                        Para visualizar as informações do clima você precisa habilitar a localização no browser
                        <br/>
                        <hr className="my007" />
                    </Fragment>
                </div>
                <div>
                    <section className="menu">
                        <h1 className="paginaprincipal">Login App</h1>
                        <hr className="my-3" />

                        <br />
                        <br />
                        <br />
                        <a className="link" href="/users" > Sign up </a>
                        <hr className="my007" />
                        <a className="link" href="/login" > Log in </a>
                        <hr className="my007" />
                    </section>
                </div>

            </div>
        )
    } else if (weather === false) {
        return (
            <Fragment>
                Verificando o clima...
                <br/>
                <hr className="my007" />
            </Fragment>
        )
    } else {

        return (
            
            <div >
                <div className="menuclima">
                    <Fragment>
                        <hr />
                        <ul>
                            <li> {weather['name']} </li>
                            <li> - </li>
                            <li>  {weather['weather'][0]['description']} </li>
                            <li> - </li>
                            <li>  Temperatura:  {weather['main']['temp']}° </li>
                            <li> - </li>
                            <li>  Humidade:  {weather['main']['humidity']}% </li>
                            <br/>
                            <hr className="my007" />
                        </ul>
                        
                        
                    </Fragment>
                    
                </div >
                <div>
                    <section className="menu">
                        <h1 className="paginaprincipal">Login App</h1>
                        <hr className="my-3" />
                        <a className="link" href="/users" > Sign up </a>
                        <hr className="my007" />
                        <a className="link" href="/login" > Log in </a>
                        <hr className="my007" />
                    </section>
                </div>
            </div>
        )
    }
}
export default MainPage;
