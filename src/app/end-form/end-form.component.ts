import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AppService } from '../services/app.service';
import { End } from '../model/end.model';

@Component({
  selector: 'end-form',
  templateUrl: './end-form.component.html',
  styleUrls: ['./end-form.component.css'],
})
export class EndFormComponent implements OnInit {
  end: End;
  endForm: FormGroup;
  formattedCep: string;

  constructor(public endService: AppService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.endService.getEnd().subscribe((response) => {
      this.end = response;

      this.createForm();

      const endData = localStorage.getItem('formData');

      if (endData) {
        const updateEndData = JSON.parse(endData);
        this.endForm.patchValue(updateEndData);
      }
    });
  }

  createForm() {
    this.endForm = new FormGroup({
      cep: new FormControl(
        this.end.cep,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(8),
          Validators.maxLength(8),
        ])
      ),
      logadouro: new FormControl(this.end.logradouro, Validators.required),
      complemento: new FormControl(this.end.complemento, Validators.required),
      bairro: new FormControl(this.end.bairro, Validators.required),
      localidade: new FormControl(this.end.localidade),
      uf: new FormControl(this.end.uf, Validators.required),
      ibge: new FormControl({
        value: this.end.ibge,
        disabled: true,
      }),
      gia: new FormControl(this.end.gia, Validators.required),
      ddd: new FormControl(this.end.ddd, Validators.required),
      siafi: new FormControl({
        value: this.end.siafi,
        disabled: true,
      }),
    });
  }

  saveEnd() {
    if (this.endForm.valid) {
      localStorage.setItem('formData', JSON.stringify(this.endForm.value));
    }
  }

  displayCepErrorMessage() {
    if (this.endForm.controls.cep.hasError('required')) {
      return 'Cep é obrigatório!';
    }
    if (this.endForm.controls.cep.hasError('pattern')) {
      return 'O Cep só contém números';
    }
    if (this.endForm.controls.cep.hasError('minlength')) {
      return 'O Cep precisa ter 8 números';
    }
    if (this.endForm.controls.cep.hasError('maxkength')) {
      return ' O Cep precisa ter 8 números';
    }

    return '';
  }
}
