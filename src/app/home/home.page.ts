import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  listaHoraCerta: any[] = [];

  constructor(private navCtrl: NavController, private storage: Storage) {}

  ionViewWillEnter() {
    this.storage.get('listaHoraCerta').then((value: any) => {
      this.listaHoraCerta = JSON.parse(value);
    });    
  }

  cadastrarHoraCerta() {
    this.navCtrl.navigateForward('/cadastrar-hora-certa');
  }

  excluirAlarme(alarme: any) {
    let excluir = this.listaHoraCerta.findIndex((value: any) => {
                    return value.data === alarme.data &&
                           value.hora === alarme.hora &&
                           value.falarTexto === alarme.falarTexto &&
                           value.cor === alarme.cor &&
                           value.status === alarme.status;
                  });

    this.listaHoraCerta.splice(excluir, 1);    
    this.storage.set('listaHoraCerta', JSON.stringify(this.listaHoraCerta));
  }  
}
