import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signOut')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
      </nav>
    );
  } else {
    return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signIn')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation;

// justifyContent instead of justify-content since it's JS now, not CSS
// className='f3 link dim black underline pa3 pointer:
//   - f3: larger size
//   - link: make it a clickable link (to add later)
//   - dim: make it dim when i hoover over/click on it
//   - pa3: padding of 3
//   - pointer: change mouse to the cliker/presser when we hover over it
