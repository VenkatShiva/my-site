import React, { Component } from 'react';
import ProfileContent from './ProfileContent';
import BasicTransaction from '../BasicTransition';


class Profile extends Component {
  render() {
    return (
        <BasicTransaction className="profile-page">
            <ProfileContent />
        </BasicTransaction>
    );
  }
}

export default Profile;