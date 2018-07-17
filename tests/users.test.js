import expect from 'expect';
import {Meteor} from 'meteor/meteor';
import { validateNewUser } from '../imports/api/users';

if (Meteor.isServer) {

  describe('users', function () {
    it('should allow valid email address', function () {
      const testUser = {
        emails: [
          {
            address: "test@example.com"
          }
        ]
      };
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it('should reject invalid email address', function () {
      const testUser = {
        emails: [
          {
            address: "test(at)example.com"
          }
        ]
      };
      expect(() => validateNewUser(testUser)).toThrow();
    });
  });

}
