import React, { Component} from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import './dashboard.css';
import myBG from '../../assets/usa.jpg';
  

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            user: {},
        }
    }
    
    logout = () => {
        window.location.href = "/logout";
    }

    componentDidMount() {
        document.body.style.backgroundImage = `url(${myBG})`;
        const token = localStorage.getItem('token');
        fetch('http://localhost:3004/admin', { headers: new Headers({ 'Authorization': `Bearer ${token}` })})
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error("Um erro ocorreu");
        })
        .then(users => this.setState({ users }))
        .catch(e => console.log(e));
    }

    
    render(){
        var email = localStorage.getItem('email');
        return (
            <div >
                <div className="menu">
                </div>
                <Header title="Painel de Controle" />
                <hr className="my-3" />
                <p>
                   Logado com: {email}.
                </p>
                <div className="text-center">
                <Button className="botao" color="danger" block onClick={this.logout}> Logout </Button> 
                </div>
            </div>
            
        );
    }
}
