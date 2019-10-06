import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts:{
      ID      : number,
      title   : string,
      content : string,
      date    : string,
  }[] = [];
  
  constructor(
      public navCtrl: NavController,
      public http: HttpClient,
      public loadingCtrl: LoadingController,
      public platform: Platform
  ) {}

    ionViewDidLoad(){
        if(!this.platform.is('android')){
            (<any> window).ga('send', 'pageview', '/signin');
        }
        let loading = this.loadingCtrl.create();
        loading.present();
        this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/ionicjp.wordpress.com/posts/')
            .subscribe(data => {
                this.posts = data['posts'];
                loading.dismiss();
            });
    }
}