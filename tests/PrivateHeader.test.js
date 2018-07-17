import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {PrivateHeader} from '../imports/ui/PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout', function () {
      const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={() => {}}/>);

      const buttonText = wrapper.find('.button').text();
      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function () {
      const title = "Nick is the best";
      const wrapper = mount(<PrivateHeader title={title}  handleLogout={() => {}}/>);

      const res = wrapper.find('h1').text();
      expect(res).toBe(title);
    });

    it('should call handleLogout on click', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title="Test" handleLogout={spy}/>);
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
}
