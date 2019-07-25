import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Label, Jumbotron } from 'react-bootstrap';
import ReactImage from "../../images/logo.png";
import styles from './Header.css';

class Header extends React.Component {

    constructor(){
        super();

        this.state={
        }
    }

    render(){
        return(
            <header className={styles.header}>
                <Jumbotron className={styles.jumbotron}>
                        <img src={ReactImage} alt="react" width={180} height={80} />
                        <h1 className={styles.textStyle}>Maintainance App</h1>
                </Jumbotron>
            </header>
        );
    }
}

export default Header;
