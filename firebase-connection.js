import Firebase from './src/firebase-init';

let db = Firebase.database();
let commentsRef = db.ref('comments');
let initialComments = require('./comments.json');
let index = 0;

function setItemIntoBase() {
    if (index < initialComments.length) {
        let item = initialComments[index];
        item.date = (new Date(item.date)).toISOString();
        commentsRef.push(item);
        index++;
    }
}

setInterval(setItemIntoBase, 2000);