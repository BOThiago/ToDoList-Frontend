import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable()
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  success(
    txtMensagem: string,
    durationSeconds = 5,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'end'
  ): void {
    if (txtMensagem !== '' || txtMensagem === null) {
      this._snackBar.open(txtMensagem, 'X', {
        duration: durationSeconds * 10000,
        panelClass: 'notification-success',
        horizontalPosition,
        verticalPosition,
      });
    }
  }

  info(
    txtMensagem: string,
    durationSeconds = 5,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'end'
  ): void {
    if (txtMensagem !== '' || txtMensagem === null) {
      this._snackBar.open(txtMensagem, 'X', {
        duration: durationSeconds * 1000,
        panelClass: 'notification-info',
        horizontalPosition,
        verticalPosition,
      });
    }
  }

  error(
    txtMensagem: string,
    durationSeconds = 5,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'end'
  ): void {
    if (txtMensagem !== '' || txtMensagem === null) {
      this._snackBar.open(txtMensagem, 'X', {
        duration: durationSeconds * 1000,
        panelClass: 'notification-error',
        horizontalPosition,
        verticalPosition,
      });
    }
  }
}
