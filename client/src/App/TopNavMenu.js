import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/auth-reducer';

function TopNavMenu(props) {

    const { isAuthenticated } = props;

    return (
        <div onClick={props.toggleMenu} className='topNavMenuContainer'>
            <ul className='topNavMenu'>
            {!isAuthenticated && <Link to='/' className='topNavMenuItem'>Login</Link>}
            {isAuthenticated && <Link to='/home' className='topNavMenuItem'>Home</Link>}
            {isAuthenticated && <Link to='/new-trip' className='topNavMenuItem'>+ New Trip</Link>}
                <Link to='/about' className='topNavMenuItem'>About</Link>
                {isAuthenticated && <button className='topNavMenuItem' onClick={props.logout} >Logout</button>}
            </ul>
        </div>
    )
}

export default connect(state => state.users, { logout })(TopNavMenu);
