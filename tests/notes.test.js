import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from '../imports/api/notes';

if (Meteor.isServer) {
  describe('notes', function() {

    const note1 = {
      _id: 'testNoteId1',
      title: 'My title',
      body: 'My body',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const note2 = {
      _id: 'testNoteId2',
      title: 'My title 2',
      body: 'My body 2',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(note1);
      Notes.insert(note2);
    });

    it('should insert new note', function () {
      const userId = 'testid';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      expect(Notes.findOne({ _id, userId })).toBeTruthy();
    });

    it('should not insert note if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function () {
      Meteor.server.method_handlers['notes.remove'].apply(
        { userId: note1.userId }, [note1._id]);

      expect(Notes.findOne({ _id: note1._id })).toBeFalsy();
    });

    it('should not remove note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [note1._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({_userId: note1.userId});
      }).toThrow();
    });

    it('should update note', function() {
      const title = "This is the new title";
      Meteor.server.method_handlers['notes.update'].apply({
        userId: note1.userId
      }, [
        note1._id,
        { title }
      ]);
      const note = Notes.findOne({_id: note1._id});
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note.title).toBe(title);
      expect(note.body).toBe(note1.body);
    });

    it('should throw error if extra updates', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: note1.userId
        }, [
          note1._id,
          {name: 'Nick'}
        ]);
      }).toThrow();
    });

    it('should note update note if user was not creator', function () {
      const title = "This is the new title";
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'non-creator user'
      }, [
        note1._id,
        { title }
      ]);
      const note = Notes.findOne({_id: note1._id});
      expect(note).toEqual(note1);
    });

    it('should not update note if unauthenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({},
          [note1._id, {title}]);
      }).toThrow();
    });

    it('should not update note if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({_userId: note1.userId});
      }).toThrow();
    });

    it('should return a users notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({userId: note1.userId});
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(note1);
    });

    it('should return no notes for user with none', function () {
      const res = Meteor.server.publish_handlers.notes.apply({userId: 'invalid id'});
      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });
  });
}
