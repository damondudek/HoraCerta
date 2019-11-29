import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-despertar',
  templateUrl: './despertar.page.html',
  styleUrls: ['./despertar.page.scss'],
})
export class DespertarPage implements OnInit {

  alarme: any = {};

  constructor(private textToSpeech: TextToSpeech, 
              private activatedRoute: ActivatedRoute,
              private navController: NavController) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.alarme = params;

      /*this.textToSpeech.speak({
        locale: 'pt-BR',
        rate: 1,
        text: params.falarTexto
      });*/

    });
  }

  cancelar(alarme: any) {
    // atualiza o storage
    //this.textToSpeech.stop().then(() => {
      this.navController.navigateRoot('/');
    //});
  }

}
