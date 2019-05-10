import React, { Component } from 'react';
import './Footer.css';
import { FaRegCopyright} from "react-icons/fa";
class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="footer  mt-auto py-3">
                    <div className="container">
                    <p className="para"><FaRegCopyright/>Group3</p>
                    </ div>
                </footer>
            </div>
        );
    }
}

export default Footer;