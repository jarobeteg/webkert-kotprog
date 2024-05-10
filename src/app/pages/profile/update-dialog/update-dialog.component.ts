import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.scss'
})
export class UpdateDialogComponent {
  updateForm = new FormGroup({
    newUsername: new FormControl<string>('', [Validators.required])
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<UpdateDialogComponent>) { }

  usernameUptd() {
    if (this.updateForm.valid) {
      const newUsername = this.updateForm.get('newUsername')?.value as string;
      this.dialogRef.close(newUsername);
    }
  }
}
