import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Alert,} from 'reactstrap';
import Header from '../../components/Header';
import './Login.css';
import myBG from '../../assets/mountain.jpg';



export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message : this.props.location.state?this.props.location.state.message: '',
        };
    }

    componentDidMount(){
        document.body.style.backgroundImage = `url(${myBG})`;
    }

    signUp = () => {
        window.location.href = "/users";
    }

    signIn = () => {
        const data = { email: this.email, password: this.password};
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };

        fetch('http://localhost:3008/login', requestInfo)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error("Login Fail");
        })
        .then(token => {
            localStorage.setItem('token', token);
            localStorage.setItem('email', this.email);
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
                <Header title="Login"></Header>
                <hr className="my-3" />
                {
                    this.state.message !== '' ? (
                    <Alert color="danger" className="text-center"> {this.state.message} </Alert>
                    ): ''
                }
                <Form>
                    <FormGroup>
                        <Input type="text" id="emial" onChange={e => this.email = e.target.value} placeholder="email:" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" id="password" onChange={e => this.password = e.target.value} placeholder="senha:" />
                    </FormGroup>
                    <Button  className="botao" color="success" block onClick={this.signIn}> Entrar </Button>
                    <Button className="botao" color="primary" block onClick={this.signUp}> Criar Conta </Button>
                </Form>
            </div>
            
            
        );
    }
}
