import firebase from 'firebase/app'
import 'firebase/auth';


const config={
  apiKey: "AIzaSyAj0cshoBby7it9Lyg9Zs-s_bkcyUZMV_Y",
  authDomain: "codalien-875c1.firebaseapp.com",
  projectId: "codalien-875c1",
  storageBucket: "codalien-875c1.appspot.com",
  messagingSenderId: "129597548440",
  appId: "1:129597548440:web:9a28714457a7a0ddb82ded"
}

firebase.initializeApp(config);





export default firebase