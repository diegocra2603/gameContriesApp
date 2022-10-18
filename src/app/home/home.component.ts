import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, takeUntil, timer } from 'rxjs';
import { ELugar, ILugar } from './home.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  _data: {[key:string]:string} = {};

  @Input() set data(data: {[key:string]:string}) {
    console.log(data);
    this._data = data;
    this.setData();
  }

  @Output() jugarDeNuevo:EventEmitter<void> = new EventEmitter<void>();

  lugares: ILugar[] = [];

  buttonSelected!: ILugar | null;

  buttonToValue!: ILugar | null;

  buttonsError: string[] = [];

  errores: number = 0;

  setData() {

    const keys = Object.keys(this._data);

    const values = (Object.values(this._data) as string[]);

    keys.forEach((key, index) => {

      this.lugares.push({
        nombre: key,
        id: index,
        type: ELugar.pais,
      })

      this.lugares.push({
        nombre: values[index],
        id: index,
        type: ELugar.capital,
      })
    });

    this.lugares.sort(() => Math.random() - 0.5);

  }

  selectValue(lugar: ILugar) {

    if (!this.buttonSelected) {

      this.setFirstValue(lugar);

    } else {

      this.buttonToValue = lugar;

      if (this.validateLugar())
        this.setCorrect();
      else
        this.setError();

    }

  }

  validateLugar(): boolean {

    if (this.buttonToValue?.id === this.buttonSelected?.id && this.buttonToValue?.type !== this.buttonSelected?.type)
      return true;
    else
      return false;

  }

  setFirstValue(lugar: ILugar) {

    this.buttonsError = [];
    this.buttonSelected = lugar;
    this.buttonToValue = null;

  }

  setError() {

    this.errores++;

    this.buttonsError.push(this.buttonToValue?.nombre!);
    this.buttonsError.push(this.buttonSelected?.nombre!);
    this.buttonSelected = null;
    this.buttonToValue = null;

  }

  setCorrect() {

    this.lugares = this.lugares.filter(n => n.id !== this.buttonToValue?.id);
    this.buttonsError = [];
    this.buttonSelected = null;
    this.buttonToValue = null;

  }

  setColorsButtons(lugar: ILugar) {

    if (this.buttonSelected?.nombre === lugar.nombre) {
      return 'btn btn-primary';
    } else if (this.buttonsError.includes(lugar.nombre)) {
      return 'btn btn-danger';
    } else {
      return 'btn btn-secondary';
    }

  }

  _jugarDeNuevo() {
    
    this.jugarDeNuevo.emit();    
    this.errores = 0;
  
  }

}
