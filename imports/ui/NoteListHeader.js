import React from 'react';
import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import {Notes} from '../api/notes';

export const NoteListHeader = (props) => {
  return (
    <button onClick={() => props.meteorCall('notes.insert')}>
      Create Note
    </button>
  );
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);

export const NoteList = (props) => {
  return (
    <div>
      NoteList {props.notes.length}
    </div>
  );
};

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired
};
