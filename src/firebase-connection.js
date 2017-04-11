import Firebase from './firebase-init';

const CommentsData = Firebase.database().ref('comments');

export default CommentsData;
