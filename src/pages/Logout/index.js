import { Component } from 'react';

export default class Logout extends Component {

    componentWillMount() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.props.history.push('/');
    }

    render(){
        return null;
    }
}