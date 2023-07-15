import React from 'react';
import './pagina_inicail.css';


function MainPage() {

    return (
        <div >
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
export default MainPage;
