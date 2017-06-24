var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message messageect', () => {
        var from = "YJ";
        var text = "hello world!";
        var message = generateMessage(from, text);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        })
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'User';
        var latitude = 11;
        var longitude = 40;
        var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        var message = generateLocationMessage('User', latitude, longitude);
        expect(message).toInclude({from, url});
        expect(message.createAt).toBeA('number');
    })
})