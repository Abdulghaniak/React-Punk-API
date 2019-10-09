import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PubSub from 'pubsub-js'
import './Home.css'
import Dexie from 'dexie'; // A lightweight, minimalistic wrapper that provides an API for using IndexedDB.
import Favourites from '../Favourites/Favourites';

/**
* This Component represents the Home Page where we will be displaying all the beers
*/
export default class Home extends Component {
  constructor() {
    super();

    // An array of all the bears to be displayed
    this.allBeers = [];
    this.state = { beers: [], favBeers: [], isLoading: true, isOpen: false};
    
    // New instance of Dexie
    this.db = new Dexie('FavDatabase');
    this.db.version(1).stores({ beers: "id, fav" });

    this.favBeer = this.favBeer.bind(this);
  }
  /**
  * React lifecycle hooks for detecting changes in the component
  */
  componentDidMount() {
    // Determine the visibility of the beers to show based on user search
    PubSub.subscribe('search', (topic, value) => {
      this.search(value);
    });
    
    // function call to get the the updated response of beers
    this.getBeers();
  }

  // Search function for the user inout to filter the beers
  search(value){
    // Make a list only with beers that include the substring provided
    let list = this.allBeers.filter(beer => beer.name.includes(value));
    this.setState({beers: list})
  }


  // Update the beers badge to be favourit or not and adding it to the favBeers array.
  favBeer(beer) {
    beer.fav = !beer.fav;
    if (beer.fav) {
      const favBeers = this.state.favBeers.concat(beer);
      this.setState({ favBeers })
    }
    else {
      const favBeers = this.state.favBeers.filter(a => a.id !== beer.id);
      this.setState({ favBeers }) 
    }
  }

  // Get all the beers data
  getBeers() {
    // To refer Home inside arrow functions
    const self = this;
    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
      })
    }

    fetch('https://api.punkapi.com/v2/beers', requestInfo)
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        throw new Error('Request to get all beers failed');
      }
    })
    .then(beers => {
      self.allBeers = beers;

      this.dbSync(self.allBeers)
      this.setState({beers: self.allBeers});
    });
  }

  // Sync with the DB.
  dbSync(beers){
    beers.forEach(beer => {
      this.db.transaction('rw', this.db.beers, async() => {
        let query = this.db.beers.where('id').equals(beer.id);
        if((await query.count()) === 0) {
          this.db.beers.add({id: beer.id, fav: false});
          beer.fav = false;
        } else {
          query.first().then(result => beer.fav = result.fav);
        }
        await this.setState({isLoading: false});
      }).catch(e => {
        console.log(e.stack || e);
      })
    });
  }

  // Open the favourites modal
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  // Close the favourites modal
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  /**
  * React lifecycle hook.
  * Render the Markup template for the Beer Home Page
  * All list of beers
  */
  render() {
    // Handle the loader
    if(this.state.isLoading) {
      return (<div className="loader"></div>);
    }
    return (
      <div className="container">
        <div className="row">
          <span className="favourites-title" onClick={(e) => this.setState({ isOpen: true })}>Favourites</span>
          <Favourites favouriteList={this.state.favBeers} isOpen={this.state.isOpen} onClose={e => this.setState({ isOpen: false })}>
            Lorem Ipsum
          </Favourites>
        </div>
        <div className="row">
          <div className="beers col-md-12">
            {this.state.beers.map(beer => {
              return (
                  <div key={beer.name} className="beer">
                    <i className={"fa fa-star " + (beer.fav ? 'favourite': '')} aria-hidden="true" onClick={() => this.favBeer(beer)}></i>
                    <Link to={'/beer/' + beer.id} className="thumbnail">
                    <h4 className="beer-name">{beer.name}</h4>
                    <img src={beer.image_url} className="beer-img" alt={'picture of' + beer.name}></img>
                    <h5 className="beer-tagline">{beer.tagline}</h5>
                    </Link>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    );
  }
}