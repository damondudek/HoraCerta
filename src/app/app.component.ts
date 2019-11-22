import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundMode: BackgroundMode,
    private textToSpeech: TextToSpeech,
    private navController: NavController,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.backgroundMode.enable();
      this.backgroundMode.setDefaults({ silent: true });
      
      //this.backgroundMode.overrideBackButton();
      //this.backgroundMode.moveToBackground();

      this.backgroundMode.on('activate').subscribe(() => {      
        this.backgroundMode.disableWebViewOptimizations();        
        
        setInterval(this.verificaAlarmes, 15000);
      });
    });
  }

  formataZerosEsquerda(valor: number) {
    return valor > 9 ? valor : "0" + valor;
  }

  formataData(data: Date) {
    return this.formataZerosEsquerda(data.getDate()) + 
            "/" + 
            this.formataZerosEsquerda(data.getMonth()) + 
            "/" + 
            data.getFullYear();
  }

  formataHora(data: Date) {
    let horas = data.getHours(),
        minutos = data.getMinutes();

    return this.formataZerosEsquerda(horas) + 
            ":" + 
            this.formataZerosEsquerda(minutos);
  }

  verificaAlarmes() {
    let hoje = new Date(),
        data = this.formataData(hoje),
        hora = this.formataHora(hoje),
        despertar = [];

    this.storage.get("listaHoraCerta").then((value) => {
      let listaDeAlarmes: [] = JSON.parse(value);

      despertar = listaDeAlarmes.filter((value: any, index) => {
          return value.data === data && value.hora === hora;
      });

      if (despertar.length > 0) {
        this.navController.navigateRoot('/despertar').then(() => {
          this.textToSpeech.speak({
            text: "Boa noite turma!!! vamo q vamo! Acorda Eliiiiasssss",
            locale: "pt-BR",
            rate: 1
          });
        });
      }

    });
  }

}
