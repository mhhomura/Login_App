import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import Header from '../../components/Header';
import './createuser.css';
import myBG from '../../assets/laptop.jpg';

export default class CreateUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message : this.props.location.state?this.props.location.state.message: '',
        };
    }

    componentDidMount(){
        document.body.style.backgroundImage = `url(${myBG})`;
    }

    signIn = () => {
        window.location.href = "http://localhost:3004/login";
    }

    signUp = () => {
        const data = { email: this.email, usuario: this.usuario, password: this.password};
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };

        fetch('http://localhost:3008/users', requestInfo)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error("Usuário já registrado");
        })
        .then(token => {
            localStorage.setItem('token', token);
            this.props.history.push("/admin");
            return;
        })
        .catch(e => {
            this.setState({ message: e.message });
        }); 
    }

    render(){
        return(
            <div className="col-md-3">
                <Header title="Create Account"></Header>
                <hr className="my-3" />
                {
                    this.state.message !== '' ? (
                    <Alert color="danger" className="text-center"> {this.state.message} </Alert>
                    ): ''
                }
                <Form>
                    <FormGroup>
                        <Input type="text" id="email" onChange={e => this.email = e.target.value} placeholder="email:" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" id="usuario" onChange={e => this.usuario = e.target.value} placeholder="usuario:" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" id="password" onChange={e => this.password = e.target.value} placeholder="senha:" />
                    </FormGroup>
                    <Button className="botao" color="success" block onClick={this.signUp}> Criar </Button>
                    <Button className="botao" color="primary" block onClick={this.signIn}> Login </Button>
                </Form>
            </div>
        );
    }
}