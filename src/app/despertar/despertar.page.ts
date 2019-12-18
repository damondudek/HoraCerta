import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { NavController } from '@ionic/angular';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-despertar',
  templateUrl: './despertar.page.html',
  styleUrls: ['./despertar.page.scss'],
})
export class DespertarPage implements OnInit {
  alarme: any = {};
  cancelado: boolean = false;

  constructor(private textToSpeech: TextToSpeech, 
              private activatedRoute: ActivatedRoute,
              private navController: NavController,
              private backgroundMode: BackgroundMode) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.alarme = params;
      this.despertar();
    });
  }

  despertar() {
    const el = document.getElementById('ion-content-despertar');
          el.style.setProperty('--ion-background-color', this.alarme.cor);
          el.style.setProperty('--color', 'white');

    if (this.cancelado) return;

    this.textToSpeech.speak({
      locale: 'pt-BR',
      rate: 1,
      text: this.alarme.falarTexto
    }).then( () => {
      setTimeout(() => this.despertar(), 100);
    });
  }

  cancelar() {
    this.cancelado = true;
    
    this.textToSpeech.stop();
    this.backgroundMode.moveToBackground();
    this.navController.navigateRoot('/');
  }

}
