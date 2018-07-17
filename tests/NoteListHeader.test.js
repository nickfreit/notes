import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {NoteListHeader} from '../imports/ui/NoteListHeader';

if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    it('should call meteorCall on click', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy}/>);

      wrapper.find('button').simulate('click');
      expect(spy.calls[0].arguments[0]).toBe('notes.insert');
    });
  });
}
