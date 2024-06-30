import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  overallCounter: number;// = 0;
  clickCounter = 0;
  helloClickCounter = 0;
  lastTimeButtonWasPressed;
  tonyImg = './assets/tony.jpg';
  
  constructor(public toastController: ToastController) {
    //clear during testing
    //localStorage.clear();

    //if user first time installing the app
    if (localStorage.getItem("clickCounter") === null) {
      //deafault count to 0 to add to later
      localStorage.setItem("clickCounter", "0");
    }

    this.overallCounter = parseInt(localStorage.getItem("clickCounter") || "0"); 
  }

  async presentToast() {
    //reset the counter if needed
    var currentTime = (new Date().getTime()) / 1000;
    if (currentTime - this.lastTimeButtonWasPressed >= 300) {
      // then more than 5 minutes elapsed.
      //console.log('5min later...');
      this.clickCounter = 0;
    }
    //set button time clicked
    this.lastTimeButtonWasPressed = (new Date().getTime()) / 1000;
    //count clicks
    this.clickCounter++;// = this.clickCounter + 1;    
    //add to overall clicks
    localStorage.setItem("clickCounter", (this.overallCounter + this.clickCounter + this.helloClickCounter).toString())
    
    //change images every so often
    if (this.clickCounter >= 120){
      this.tonyImg = './assets/tony-gone.jpg';
    }
    else if (this.clickCounter >= 100){
      this.tonyImg = './assets/tony-gettingup.jpg';
    }
    else if (this.clickCounter >= 60){
      this.tonyImg = './assets/tony-gone.jpg';
    }
    else if (this.clickCounter >= 50){
      this.tonyImg = './assets/tony-falling.jpg';
    }

    //launch toast on click
    const toast = await this.toastController.create({
      message: (this.clickCounter < 10) ? 'Tony was touched' 
        : (this.clickCounter < 20) ? 'Tony is still being touched' 
        : (this.clickCounter < 30) ? "Tony, ummm....continues to be touched" 
        : (this.clickCounter < 50) ? "DUDE! Stop touching TONY!" 
        : (this.clickCounter < 70) ? "YOU'RE ABUSIVE !!!!!!!!!"
        : (this.clickCounter < 100) ? "OMG Tony's on the floor!"
        : (this.clickCounter < 150) ? "Tony! Please get up..."
        : (this.clickCounter < 160) ? "FOR THE LOVE OF GOD, STOP!"
        : (this.clickCounter < 200) ? "Tony has passed away ...."
        : (this.clickCounter < 220) ? "....and you're still at it - cool."
        //: (this.clickCounter < 240) ? ""
        : "You win, okay? You WIN!",
      duration: 200
    });
    toast.present();

    //this.sendTextFromToast();
  }

  async helloTony(){
    var currentTime = (new Date().getTime()) / 1000;
    if (currentTime - this.lastTimeButtonWasPressed >= 300) {
      // then more than 5 minutes elapsed.
      //console.log('5min later...');
      this.helloClickCounter = 0;
    }
    //set button time clicked
    this.lastTimeButtonWasPressed = (new Date().getTime()) / 1000;
    //count clicks
    this.helloClickCounter++;// = this.clickCounter + 1;    
    //add to overall clicks
    localStorage.setItem("clickCounter", (this.overallCounter + this.clickCounter + this.helloClickCounter).toString());

    const toast = await this.toastController.create({
      message: (this.clickCounter > 70 && this.clickCounter < 200) 
      ? "Tony is can't really speak right now" 
        : (this.clickCounter > 200) ? "errr...Tony, umm, can't talk right now..." 
        : "Tony says Hi back.",
      duration: 200
    });
    toast.present();
  }

  resetTony(){
    this.clickCounter = 0;
    this.helloClickCounter = 0;
    this.overallCounter = parseInt(localStorage.getItem("clickCounter") || "0"); 
    this.tonyImg = './assets/tony.jpg';    
  }

  //Please review setup here: https://github.com/typpo/textbelt
  //https://lowendbox.com/blog/how-to-send-sms-messages-from-your-vps-using-textbelt/
  //https://stackoverflow.com/questions/25212073/installing-textbelt-on-my-own-server
  /* sendTextFromToast(){
    fetch('https://textbelt.com/text', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '[ phone number here ]',
        message: '[ text message here ]',
        key: '[ key here ]',
      }),
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
    });
  } */
}
