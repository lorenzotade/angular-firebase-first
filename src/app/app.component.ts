import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Post} from "./Post";
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTJxJ2T-ghqtEFgoU7I325qbaB0V0X4CI",
  authDomain: "angular-firebase-69.firebaseapp.com",
  projectId: "angular-firebase-69",
  storageBucket: "angular-firebase-69.appspot.com",
  messagingSenderId: "458936102533",
  appId: "1:458936102533:web:6f0989af578e3417d003ec",
  measurementId: "G-21RWZ84NGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const endpoint: string = "https://angular-firebase-69-default-rtdb.europe-west1.firebasedatabase.app/posts.json"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  options: any = {day: '2-digit', month: 'numeric', year: 'numeric'};
  date = new Date();

  title: string = '';
  content: string = '';
  date_f: string = this.date.toLocaleDateString('en-US', this.options);
  post?: Post;

  constructor(private http: HttpClient) { }

  add(formData: NgForm) {
    this.post = {"title": formData.value.title, "content": formData.value.content, "date": this.date_f};
    this.http.post<{[name: string]: Post}>(endpoint, this.post)
      .subscribe((res: any) => {
        console.log('response',res.content);
      })
  }

}
