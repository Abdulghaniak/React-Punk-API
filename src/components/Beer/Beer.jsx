import React, { Component } from 'react';
import './Beer.css';

/**
* This Component represents the Beer description page
*/
export default class Beer extends Component {
    constructor(props) {
        super();
        /**
         * The unique identifier of the Beer
         */
        this.beerId = props.match.params.id;
        this.state = {beer: ''};
    }
    /**
    * React lifecycle hooks for detecting changes in the component
    * We will be loading the beers data at this stage
    */
    componentDidMount() {
        this.getBeersData();
    }

    /**
    * Function responsible for getting all the details of the selected beer
    */
    getBeersData() {
        const requestInfo = {
            method: 'GET',
            headers: new Headers({
              'Content-type': 'application/json',
            })
        }
      
        fetch('https://api.punkapi.com/v2/beers/' + this.beerId, requestInfo)
        .then(response => {
            if(response.ok){
                return response.json();
            } else {
                throw new Error(`Request to get a beer with id ${this.beerId} failed`);
            }
        })
        .then(beer => this.setState({beer: beer[0]}));
    }

    /**
    * React lifecycle hook.
    * Render the Markup template for the Beer Details Page
    */
    render() {
        let beer = this.state.beer;
        // Handle the loader
        if(!beer.volume || !beer.food_pairing){
            return (<div className="loader"></div>);
        }
        
        return (
            <div className="container beer-details">
                <div className="row">
                    <div className="img-wrapper col-md-3">
                        <img className="beer-image" src={beer.image_url} alt={'picture of' + beer.name}/>
                    </div>
                    <div className="beer-info col-md-9">
                        <h1>{beer.name}</h1>
                        <hr/>
                        <h3>{beer.tagline}</h3>
                        <p className="volume">Volume: {beer.volume.value} {beer.volume.unit}</p>
                        <p className="description">{beer.description}</p>
                        <ul className="list-group">
                            <li className="list-group-item food-pairing">Food pairing</li>
                            {beer.food_pairing.map(food => {
                                return (
                                    <li className="list-group-item">{food}</li>
                                );
                            })}
                        </ul>
                        <div className="container technical-info">
                            <ul className="row">
                                <li className="col-md-6 col-6">ABV: {beer.abv}</li>
                                <li className="col-md-6 col-6">IBU: {beer.ibu}</li>
                                <li className="col-md-6 col-6">EBC: {beer.ebc}</li>
                                <li className="col-md-6 col-6">SRM: {beer.srm}</li>
                                <li className="col-md-6 col-6">PH: {beer.ph}</li>
                                <li className="col-md-6 col-6">FB: {beer.first_brewed}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}