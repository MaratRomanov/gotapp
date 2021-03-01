import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import './app.css';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import { BooksPage, BooksItem, CharacterPage, HousesPage, NotFound } from '../pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {

    gotService = new gotService();

    state = {
        showChar: false,
        error: false
    }

    componentDidCatch() {
        this.setState({ error: true });
    }

    showChar = () => {
        this.setState((state) => {
            return {
                showChar: !state.showChar
            }
        });
    }

    render() {
        const { showChar, error } = this.state;

        const showRandomChar = showChar ? <RandomChar  /> : null;        

        if (error) {
            return <ErrorMessage />
        }

        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {showRandomChar}
                                <button
                                    className="show-char-btn"
                                    onClick={this.showChar}
                                >
                                    Random char
                            </button>
                            </Col>
                        </Row>
                        <Switch>                           
                            <Route path='/' exact component={() => <h1>Welcome</h1>} />
                            <Route path='/characters' component={CharacterPage} />
                            <Route path='/books' exact component={BooksPage} />
                            <Route path='/houses' component={HousesPage} />
                            <Route path='/books/:id' render={
                                ({ match }) => {
                                    const id = match.params.id;
                                    return <BooksItem bookId={id} />
                                }
                            } />
                            <Route path='*' component={NotFound} />
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    }
};