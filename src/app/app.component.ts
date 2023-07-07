import { Component, VERSION } from '@angular/core';
import { End } from './model/end.model';
import { AppService } from './app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  end: End;
  name = 'Angular' + VERSION.major;
  endForm!: FormGroup;
  PAUSE = 400;

  //É como debounceTime, mas o intervalo de tempo do silêncio da emissão é determinado por um segundo Observable.
  debounce = new Subject<any>();

  constructor(public service: AppService, private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getEnd();

    //É como atraso, mas passa apenas a notificação mais recente de cada rajada de emissões.
    this.debounce.pipe(debounceTime(this.PAUSE)).subscribe((event) => {
      let value = event.target.value ? event.target.value.replace('-', '') : '';

      if (value.length >= 8 && value !== '') {
        this.getEnd(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  getEnd(value?: string) {
    this.service.getEndInfo(value).subscribe({
      next: (res) => this.buildForm(res),
      error: () => alert('Há um erro ao fazer a consulta.'),
    });
  }

  buildForm(end?: End) {
    this.endForm = this.formBuilder.group({
      cep: [end ? end.cep : '', [Validators.required, Validators.maxLength(9)]],
      logradouro: [end ? end.logradouro : ''],
      bairro: [end ? end.bairro : ''],
      localidade: [end ? end.localidade : ''],
      uf: [end ? end.uf : ''],
      complemento: [end ? end.complemento : ''],
      ibge: [{ value: end ? end.ibge : '', disabled: true }],
      gia: [end ? end.gia : ''],
      ddd: [end ? end.ddd : ''],
      siafi: [{ value: end ? end.siafi : '', disabled: true }],
    });
  }

  //armazena valor  e criando um novo par de valor
  saveOnStorage() {
    const end = this.endForm.getRawValue() as End;
    localStorage.setItem('endObject', JSON.stringify(end));
    alert('Objeto salvo');
  }
}
