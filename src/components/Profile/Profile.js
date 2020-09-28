import React, { Component } from 'react';
import ProfileContent from './ProfileContent';
import BasicTransaction from '../BasicTransition';


class Profile extends Component {
  render() {
    return (
        <BasicTransaction>
            {/* <Navbar logout={logout}/> */}
            <ProfileContent />
        </BasicTransaction>
    );
  }
}

export default Profile;