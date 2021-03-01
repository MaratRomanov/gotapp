import React, { Component } from 'react';
import './itemDetails.css';
import Spinner from '../spinner';

const Field = ({ item, field, label }) => {
    return (
        <div className="char-details-inform-line">
            <span className="char-details-inform-span">{label}</span>
            <span>{item[field]}</span>
        </div>
    )
}

export {Field};

export default class ItemDetails_old extends Component {

    state = {
        item: null,
        needUpdate: false
    }

    componentDidMount() {
        this.updateChar();        
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.setState({ needUpdate: true });
            this.updateChar();
        }
    }

    updateChar() {        
        const { itemId, getData } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({ 
                    item,
                    needUpdate: false
                })
            })
    }

    render() {        
        const { item, needUpdate } = this.state;

        if(needUpdate){
            return <Spinner />
        }

        if (!this.state.item) {
            return <span className="select-error">Выберите</span>
        }       
        
        const { name } = item;

        return (
            <div className="char-details">
                <h4>{name}</h4>
                <div className="char-details-inform">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </div>
            </div>
        );
    }
}