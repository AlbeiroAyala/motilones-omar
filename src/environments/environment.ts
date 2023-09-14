// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCW7sZrFFbVtCNftNmhdlFHXsk-jh6o4LI",
    authDomain: "greenhousseweb.firebaseapp.com",
    projectId: "greenhousseweb",
    storageBucket: "greenhousseweb.appspot.com",
    messagingSenderId: "105586037829",
    appId: "1:105586037829:web:6624f0ab6ad34fd2f37f2c",
    measurementId: "G-G7B8RH27R5"
  },
   dataApp: {
    nombreApp: 'Extra rapido los Motilones S A',
    logo: 'assets/icon/favicon.png'
   }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
