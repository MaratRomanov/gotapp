import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';

export default class NotFound extends Component {    
    
    render() {
        
        return (
            <div className="notFound">
                <span>Такой страницы нет</span>
                <Link to='/'>
                    на главную
                </Link>
            </div>
        );
    }
}