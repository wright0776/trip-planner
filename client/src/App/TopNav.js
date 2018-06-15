import React, { Component } from 'react';
import TopNavMenu from './TopNavMenu';
import {Link} from 'react-router-dom';

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        }
    }

    toggleMenu = (e) => {
        this.setState(prevState => ({ menu: !prevState.menu }));
    }

    render() {
        return (
            <div className='topNav'>
                <Link className='topNavTitleContainer' to='/'>
                    <h1 className='topNavTitle'>Trip Organizer</h1>
                </Link>
                <button onClick={this.toggleMenu} className='topNavButton'>&#8942;</button>
                {this.state.menu ? <TopNavMenu toggleMenu={this.toggleMenu} /> : null}
            </div>
        )
    }
}

export default TopNav
