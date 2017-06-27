const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'Vsause',
            room: 'Angular Course'
        },
        {
            id: '3',
            name: 'Jenha',
            room: 'Node Course'
        }];    
    });

    


    it('should add new user', () => {
        var users = new Users();

        var user = {
            id: '321',
            name: 'Jo',
            room: 'The Dev-ops'
        }

        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it ('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser('1');

        expect(user.id).toEqual(userId);
        expect(users.users.length).toBe(2);
    });


    it ('should not remove a user', () => {
        var user = users.removeUser('4');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });


    it ('should find a user', () => {
        var userId = '1';
        var resUser = users.getUser(userId);
        expect(resUser.id).toEqual(userId);
    });


    it ('should not find user', () => {
        var resUser = users.getUser('4');
        console.log(resUser);
        expect(resUser).toNotExist();
    });


    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Jenha']);
    });


    it('should return names for angular course', () => {
        var userList = users.getUserList('Angular Course');

        expect(userList).toEqual(['Vsause']);
    });
})