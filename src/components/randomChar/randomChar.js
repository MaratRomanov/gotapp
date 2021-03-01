import React, { Component, useState, useEffect } from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

function RandomChar({ interval = 15000 }) {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        updateCharacter();
        let timerId = setInterval(updateCharacter, interval);

        return () => clearInterval(timerId);
    }, []);

    function updateCharacter() {
        const charachter = new gotService();
        const id = Math.floor(Math.random() * 140 + 25);
        charachter.getCharacter(id)
            .then((char) => {
                return(
                    setChar(char),
                    setError(false),
                    setLoading(false)
                )
            })
            .catch((err) => {
                return(
                    setError(true),
                    setLoading(false)
                )
            });
    }

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

export default RandomChar;