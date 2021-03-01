import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {

    gotService = new gotService();

    state = {
        selectedHouse: 0,
        error: false
    }

    onHouseSelected = (id) => {
        this.setState({ selectedHouse: id })
    }

    componentDidCatch() {
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }

        const houseList = (
            <ItemList
                onItemSelected={this.onHouseSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({ name }) => `${name}`}
            />
        )

        const houseDetails = (
            <ItemDetails 
                getData={this.gotService.getHouse}
                itemId={this.state.selectedHouse}
            >
                <Field field='name' label='Name' />
                <Field field='region' label='Region' />
                <Field field='words' label='Words' />
                <Field field='titles' label='Titles' />
                <Field field='ancestralWeapons' label='AncestralWeapons' />
            </ ItemDetails>
        )

        return (
            <RowBlock left={houseList} right={houseDetails} />
        );
    }
}