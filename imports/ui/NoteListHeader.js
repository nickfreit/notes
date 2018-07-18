import React from 'react';
import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

import {Notes} from '../api/notes';

export const NoteListHeader = (props) => {
  return (
    <div className='item-list__header'>
      <button  className='button' onClick={() => {
        props.meteorCall('notes.insert', (err, res) => {
          if (res) {
            props.Session.set('selectedNoteId', res);
          }
        });
      }}>
        Create Note
      </button>
    </div>
  );
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
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
  meteorCall: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired
};
