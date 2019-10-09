import React, { Component } from 'react';
import './Favourites.css'

/**
* This Component represents the Favourites Modal in the page
*/
class Favourites extends Component {

    /**
    * This Method have a conditional rendering for the Modal Body
    * Based on if the user have Favourite Beers or Not.
    */
    renderModalBody(favList) {
        if(favList.length > 0) {
            return (
                this.props.favouriteList.map(fav =>
                    <div key={"wrapper-" + fav.id} className="col-md-4">
                        <div key={fav.id} className="beer">
                            <h6 key={"name-" + fav.id}>{fav.name}</h6>
                            <img className="beer-img" src={fav.image_url} alt={'picture of' +fav.name} />
                            <p key={"tagline-" + fav.id}>{fav.tagline}</p>
                        </div>
                    </div>
                )
            )
        }
        else {
            return <p>No Favourites Selected</p>
        }
    }
    /**
    * React lifecycle hook.
    * Rendering the Markup template for the Favourites Modal.
    */
    render() {
        console.log(this.props);
        let dialog = (
            <div className="modal favourites" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <a tabIndex="0" onFocus={() => this.focusTrap('backward')}></a>
                        <div className="modal-header">
                            <h5 className="modal-title">Favourites</h5>
                            <button type="button" className="close" onClick={this.props.onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container col-md-12">
                                <div className="row">
                                    {this.renderModalBody(this.props.favouriteList)}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>Close</button>
                        </div>
                        <a tabIndex="0" onFocus={() => this.focusTrap('forward')}></a>
                    </div>
                </div>
            </div>
        );
        // Remove the Modal Dialog if the modal is not triggered.
        if (!this.props.isOpen) {
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>
        );
    }
    /**
    * Handle the Modal Trap for accessibility/screen readers (ADA)
    */
    focusTrap(focusDirection) {
        let focusSelector = focusDirection === 'forward' ? '.modal-header .close' : '.modal-footer .btn'; 
        document.querySelector(focusSelector).focus();
    }
}

 
export default Favourites;