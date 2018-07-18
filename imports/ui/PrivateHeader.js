import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

export const PrivateHeader = (props) => {
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  return (
    <div className='header'>
      <div className='header__content'>
        <img className='header__nav-toggle' src={navImageSrc} onClick={props.toggleNav}/>
        <h1 className='header__title'>{props.title}</h1>
        <button className='button button--link-text' onClick={() => props.handleLogout()}>
          Logout
        </button>
      </div>
    </div>
  );
}

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
  isNavOpen: React.PropTypes.bool.isRequired,
  toggleNav: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    isNavOpen: Session.get('isNavOpen'),
    toggleNav: () => Session.set('isNavOpen', !Session.get('isNavOpen'))
  };
}, PrivateHeader);
