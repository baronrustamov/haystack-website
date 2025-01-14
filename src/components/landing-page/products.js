import React from 'react';
import Button from "./button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import OpenSource from "../../images/im-card-1@3x.png"
import HaystackHub from "../../images/im-card-2@3x.png"
import ProductVideo from "../../video/HaystackHubVideo_new.mp4"
import ProductVideoOGG from "../../video/HaystackHubVideo_new.webm"
import Captions from "file-loader!../../video/captions_en.vtt"
import firebase from 'gatsby-plugin-firebase';

const Products = props => {

    const incrementViews = async () => {
        const ref = firebase.database().ref(`views`).child(`haystack-hub-video-views-default-rtdb`);
      
        ref.transaction((currentViews) => {
          return currentViews + 1;
        });
      };

    const onPlayVideo = () => {
          
              incrementViews();
    };

  return (
    <section className="products">
        <div className="all-products">
      <h2>Our Products</h2>
      <h3 className="h3-products">Free for Developers. Full Service for Enterprises.</h3>
        <div className="products-options products-opensource">
            <div className="prodcuts-header">
                <img className="product-img haystackos-img" src={OpenSource} alt="Haystack Open Source"></img>
                <h4>Haystack Open Source</h4>
                <p>Open source framework to scale QA models to large collections of documents.</p>
            </div>
            <div className="description-features">
            <div className="product-description">Feature higlights include:</div>
            <div className="products-features">
            <div className="row">
                <div className="column-left">
                    <ul>
                        <li>
                            <FontAwesomeIcon className="check-font" icon={faCheck}/>
                        </li>
                        <li>
                            <FontAwesomeIcon className="check-font" icon={faCheck}/>
                        </li>
                    </ul>
                </div>
                <div className="column">
                <ul>
                    <li>
                        Latest NLP Models
                    </li>
                    <li>
                        Flexible databases
                    </li>
                </ul>
                </div>
                <div className="column-left">
                <ul>
                    <li>
                        <FontAwesomeIcon className="check-font" icon={faCheck}/> 
                    </li>
                </ul>
                </div>
                <div className="column">
                <ul>
                    <li>
                        Scalability 
                    </li>
                </ul>
                </div>
            </div>
            </div>
            </div>
            <div className="products-actions">
                <Button linkName="learnmore-button-os-link" label="Learn More"  className="learnmore-button-os" to="/docs/intromd" />
                <Button linkName="trial-button-os-link" label="Get Started" className="trial-button-os" to="/docs/get_startedmd" />
            </div>
        </div>
        <div className="products-options products-enterprise">
            <div className="prodcuts-header">
                <img className="product-img haystackhub-img" src={HaystackHub} alt="Haystack Hub"></img>
                <h4>Haystack Hub</h4>
                <p>Enterprise-ready subscription with full service to enable neural search.</p>
            </div>
            <div className="description-features">
            <div className="product-description">Everything in Open Source plus:</div>
            <div className="products-features">
            <div className="row">
            <div className="column-left">
                <ul>
                    <li>
                        <FontAwesomeIcon className="check-font" icon={faCheck}/>
                    </li>
                    <li>
                        <FontAwesomeIcon className="check-font" icon={faCheck}/>
                    </li>
                </ul>
                </div>
                <div className="column">
                <ul>
                    <li>
                        Web interface for configuring and operating your QA system
                    </li>
                    <li>
                        Search UI for end users
                    </li>
                </ul>
                </div>
                <div className="column-left">
                <ul>
                    <li>
                        <FontAwesomeIcon className="check-font" icon={faCheck}/>
                    </li>
                    <li>
                        <FontAwesomeIcon className="check-font" icon={faCheck}/>
                    </li>
                </ul>
                </div>
                <div className="column">
                <ul>
                    <li>
                        API access
                    </li>
                    <li>
                        Support
                    </li>
                </ul>
                </div>
            </div>
            </div>
            </div>
            <div className="products-actions">
                <Button linkName="trial-button-link" label="Join the Waiting List" className="trial-button" to="/signup/beta" />
            </div>
        </div>
        </div>
        <div className="product-video">
            <video controls onPlay={onPlayVideo}>
                <source src={ProductVideo} type="video/mp4" />
                <source src={ProductVideoOGG} type="video/webm" />
                Your browser does not support the video tag.
                <track kind="captions" srcLang="en" src={Captions} />
            </video>
        </div>
    </section>
  )
};

export default Products;