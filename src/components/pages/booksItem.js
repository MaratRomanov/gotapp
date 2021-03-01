import React, { Component } from 'react';
import gotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

export default class BooksItem extends Component {

    gotService = new gotService();

    render() {
        return (
            <ItemDetails 
                getData={this.gotService.getBook}
                itemId={this.props.bookId}
            >
                <Field field='numberOfPages' label='Number of pages' />
                <Field field='publiser' label='Publiser' />
                <Field field='released' label='Released' />
            </ ItemDetails>
        )
    }

}