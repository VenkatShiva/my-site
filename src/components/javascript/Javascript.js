import React, { Component } from 'react';
import JavascriptContent from './JavascriptContent';
import BasicTransaction from '../BasicTransition';


class Profile extends Component {
  render() {
    return (
        <BasicTransaction >
            <JavascriptContent />
        </BasicTransaction>
    );
  }
}

export default Profile;