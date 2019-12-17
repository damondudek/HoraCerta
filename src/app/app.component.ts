import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';

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
    private navController: NavController,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {    
    this.platform.ready().then(() => {      
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      setInterval(() => this.verificaAlarmes(), 1000);
      this.backgroundMode.enable();
      //this.backgroundMode.setDefaults({ silent: true });
      
      /*this.backgroundMode.on('activate').subscribe(() => {      
        this.backgroundMode.disableWebViewOptimizations();        
        setInterval(() => this.verificaAlarmes(), 15000);
      });*/
    });
  }

  /*formataZerosEsquerda(valor: number) {
    return valor > 9 ? valor : "0" + valor;
  }

  formataData(data: Date) {
    return this.formataZerosEsquerda(data.getDate()) + 
            "/" + 
            this.formataZerosEsquerda(data.getMonth() + 1) + // adicionar + 1 no mês
            "/" + 
            data.getFullYear();
  }

  formataHora(data: Date) {
    let horas = data.getHours(),
        minutos = data.getMinutes();

    return this.formataZerosEsquerda(horas) + 
            ":" + 
            this.formataZerosEsquerda(minutos);
  }*/

  verificaAlarmes() {
    let hoje = new Date(),
        //data = this.formataData(hoje),
        //hora = this.formataHora(hoje),
        data = hoje.toLocaleDateString('pt-BR'),
        hora = hoje.toLocaleTimeString('pt-BR').substr(0, 5),
        despertar = [];

    this.storage.get("listaHoraCerta").then((value) => {
      let listaDeAlarmes = JSON.parse(value);

      listaDeAlarmes = listaDeAlarmes.map((value: any, index) => {
          if (value.status === 0 && 
              value.data === data && 
              value.hora === hora) {
                value.status = 1;
                despertar.push(value);
              }

          return value;
      });

      if (despertar.length > 0) {
        this.storage.set("listaHoraCerta", JSON.stringify(listaDeAlarmes)).then(() => {
          this.navController.navigateRoot('/despertar', {
            queryParams: despertar[0]
          });
        });
      }

    });
  }

}
