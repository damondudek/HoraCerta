import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cadastrar-hora-certa',
  templateUrl: './cadastrar-hora-certa.page.html',
  styleUrls: ['./cadastrar-hora-certa.page.scss'],
})
export class CadastrarHoraCertaPage implements OnInit {

  formCadastrarHoraCerta = new FormGroup({
    data: new FormControl('', Validators.required),
    hora: new FormControl('', Validators.required),
    falarTexto: new FormControl('', Validators.required),
    cor: new FormControl('', Validators.required)
  });

  constructor(private storage: Storage, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
    });
  }

  formataZerosEsquerda(valor: number) {
    return valor > 9 ? valor : "0" + valor;
  }

  cadastrarHoraCerta() {
    let form = this.formCadastrarHoraCerta.value;
    form.status = 0;

    let dataCompleta = new Date(form.data), 
        horaCompleta = new Date(form.hora);

    let dia = this.formataZerosEsquerda(dataCompleta.getDate()),
        mes = this.formataZerosEsquerda(dataCompleta.getMonth() + 1),
        ano = dataCompleta.getFullYear(),
        hora = this.formataZerosEsquerda(horaCompleta.getHours()),
        minutos = this.formataZerosEsquerda(horaCompleta.getMinutes());

    form.data = dia + "/" + mes + "/" + ano;
    form.hora = hora + ":" + minutos;

    console.log(form);
    
    let listaHoraCerta = [form];

    this.storage.get('listaHoraCerta').then((value: any) => {
      if (value !== null) {
        let objeto = JSON.parse(value);
        listaHoraCerta = listaHoraCerta.concat(objeto);
      }

      this.storage.set('listaHoraCerta', JSON.stringify(listaHoraCerta));
    });

    this.formCadastrarHoraCerta.reset();
  }

}

