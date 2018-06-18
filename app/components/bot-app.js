import Component from '@ember/component';
import axios from 'npm:axios';
import Pusher from 'npm:pusher-js';

export default Component.extend({
    chats: null,
    init() {
        this._super(...arguments);
        this.set('chats', []);
        let pusher = new Pusher('YOUR_APP_KEY', { // update your APP_KEY
            cluster: 'CLUSTER',
            encrypted: true
        });
        const channel = pusher.subscribe('bot');
        channel.bind('bot-response', data => {
            const response = {
                speech: data.speech,
                query: data.query
            }
            this.get('chats').pushObject(response);
        });
    },

    actions: {
        sendChat() {
            const text = this.get('message');
            axios.post('http://localhost:3000/dialogue', { text });
            this.set('message', '');
        }
    }
});
