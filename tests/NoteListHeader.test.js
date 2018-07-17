import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {NoteListHeader} from '../imports/ui/NoteListHeader';
import {notes} from '../imports/fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListHeader', function () {

    let meteorCall;
    let Session;

    beforeEach(function () {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      };
    });

    it('should call meteorCall on click', function () {
      const wrapper = mount(<NoteListHeader Session={Session} meteorCall={meteorCall}/>);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });

    it('should not set session for failed insert', function () {
      const wrapper = mount(<NoteListHeader Session={Session} meteorCall={meteorCall}/>);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]('error', undefined);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled();
    });

  });
}
