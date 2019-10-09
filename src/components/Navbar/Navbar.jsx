import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import logo from '../../assets/logo.png';
import './Navbar.css'
import {Link} from 'react-router-dom';

export default class Navbar extends Component {
    /**
     * Search Function for user inputs in the search bar of Navbar
     */
    search(event){
        event.preventDefault();
        PubSub.publish('search', this.searchedBeer.value);
    }
    /**
     * React lifecycle hook.
     * Render the Markup template for the Navigation Bar
     */
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark justify-content-between">
            <Link className="navbar-brand" src={logo} to='/'><img alt="Punk Beer" src={logo}></img></Link>
            <form className="form-inline search-field">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="search" ref={input => this.searchedBeer = input} onChange={this.search.bind(this)} />
            </form>
        </nav>
        );
    }
}