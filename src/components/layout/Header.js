import React, { useState } from 'react';
import { nav, img, icon } from './Header.module.css';
import covid19 from '../../assets/images/covid19.png';
import { InfoOutlined } from '@material-ui/icons';
// Importing Components
import Modal from './Modal';

const Header = () => {
    const [displayModal, setDisplayModal] = useState(false);
    // function to toggle modal display
    const toggleModalDisplay = () => setDisplayModal(!displayModal);
    
    return (
        <nav className={nav}>
            <img className={img} src={covid19} alt="COVID-19" />
            <InfoOutlined className={icon} onClick={toggleModalDisplay} />
            <Modal displayModal={displayModal} toggleModalDisplay={toggleModalDisplay} />
        </nav>
    )
}

export default Header;
