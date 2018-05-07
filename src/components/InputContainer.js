import React, { Component } from 'react';
import { Input, Dropdown, Button } from 'semantic-ui-react';

class InputContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            emailError: '',
            interestError: '',
            emailShake: false,
            interestShake: false,
            emailInput: '',
            interestInput: '',
            isLoading: false,
            isSubmitted: false
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        let readyToSubmit = true;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!emailRegex.test(this.state.emailInput)){
            readyToSubmit = false;
            this.addShakeEffect('email');
            this.setState({emailError: 'Please enter a valid Email address.'})
        } else {
            this.setState({emailError: ''})
        }

        if(!this.state.interestInput){
            readyToSubmit = false;
            this.addShakeEffect('interest');
            this.setState({interestError: 'Please select an option.'})
        } else {
            this.setState({interestError: ''})
        }

        if(readyToSubmit){
            this.setState({isLoading: true})
            console.log(this.state.emailInput);
            console.log(this.state.interestInput);
            setTimeout(()=> {
                this.setState({isLoading: false, isSubmitted: true});
            }, 2000);
        }
    }

    handleChange = (event, data) => {
        console.log(data)
        switch (data.type){
            case 'text':
                this.setState({emailInput: data.value});
                break;
            default:
                this.setState({interestInput: data.value});
        }
    }

    addShakeEffect = type => {
        switch(type){
            case 'email':
                this.setState({emailShake: true})
                setTimeout(() => {
                    this.setState({emailShake: false})
                }, 550)
                break;
            case 'interest':
                this.setState({interestShake: true})
                setTimeout(() => {
                    this.setState({interestShake: false})
                }, 550)
        }
    }

    render(){
        let options = [
            {text: 'Marketing', value: 'marketing'},
            {text: 'Ecommerce Marketing', value: 'ecom-marketing'},
            {text: 'Email Marketing', value:'email-marketing'},
            {text: 'Local SEO', value: 'local-seo'}
        ];

        if(this.state.isLoading){
            return (
              <form className = 'input-form' onSubmit = {this.handleSubmit}>
                  <p className = 'input-title'>Subscribe for free marketing tips</p>
                  <div className ='input-email'>
                      <Input
                          fluid
                          placeholder='Email Address'
                          onChange = {this.handleChange}
                          />
                  </div>
                  <div className = 'input-interest'>
                      <Dropdown
                          options = {options}
                          fluid
                          selection
                          onChange = {this.handleChange}
                          />
                  </div>
                  <div className = 'loading-button'>
                      <Button fluid className = 'loading-button-object'>Submitting...</ Button>
                  </div>
              </form>
            )
        }

        if(this.state.isSubmitted){
            return (
                <div className = 'submitted'>
                  <h1>Thanks for subscribing</h1>
                  <p>{"You'll start receiving free tips and resources soon."}</p>
                </div>
            )
        }

        return (
            <form className = 'input-form' onSubmit = {this.handleSubmit}>
                <p className = 'input-title'>Subscribe for free marketing tips</p>
                <div className = {this.state.emailShake ? 'shake input-email': 'input-email'}>
                    <Input
                        fluid
                        placeholder='Email Address'
                        onChange = {this.handleChange}
                        error = {this.state.emailError.length > 0}
                        />
                    <p className = 'input-error'>{this.state.emailError ? this.state.emailError : ''}</p>
                </div>
                <div className =  {this.state.interestShake ? 'shake input-interest': 'input-interest'}>
                    <Dropdown
                        options = {options}
                        fluid
                        selection
                        placeholder='Interested in...'
                        onChange = {this.handleChange}
                        error = {this.state.interestError.length > 0}
                        />
                    <p className = 'input-error'>{this.state.interestError ? this.state.interestError : ''}</p>
                </div>
                <div className = 'input-button'>
                    <Button fluid className = 'input-button-object'>Sign up now</ Button>
                </div>
            </form>
        )
    }
}

export default InputContainer
