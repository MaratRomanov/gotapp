import React, { Component } from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

export default class RandomChar_old extends Component {  

    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, this.props.interval);
    }

    componentWillUnmount(){        
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 140 + 25);        
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;
        
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
 
        return (
            <div className="random-char">
                {spinner}
                {errorMessage}
                {content}
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval: 15000
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <div className="random-char-inform">
                <div className="random-char-inform-line">
                    <span className="random-char-inform-span">Gender</span>
                    <span>{gender}</span>
                </div>
                <hr className="random-char-inform-hr" />
                <div className="random-char-inform-line">
                    <span className="random-char-inform-span">Born</span>
                    <span>{born}</span>
                </div>
                <hr className="random-char-inform-hr" />
                <div className="random-char-inform-line">
                    <span className="random-char-inform-span">Died</span>
                    <span>{died}</span>
                </div>
                <hr className="random-char-inform-hr" />
                <div className="random-char-inform-line">
                    <span className="random-char-inform-span">Culture</span>
                    <span>{culture}</span>
                </div>
            </div>
        </>
    )
}