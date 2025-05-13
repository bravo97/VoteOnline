import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BallotService } from '../../../services/ballot.service';
import { BallotModel } from '../../../services/models/ballot.models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ballotdialog',
  standalone: false,
  templateUrl: './ballotdialog.component.html',
  styleUrl: './ballotdialog.component.scss'
})
export class BallotdialogComponent{
  form: FormGroup;

constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<BallotdialogComponent>) {
  this.form = this.fb.group({
    tenVD: ['', Validators.required],
    mota: [''],
    ngayBatDau: [null, Validators.required],
    ngayKetThuc: [null, Validators.required],
    phuongAns: this.fb.array([this.createOption()])
  });
}


get phuongAns(): FormArray {
  return this.form.get('phuongAns') as FormArray;
}

createOption(): FormGroup {
  return this.fb.group({ ten: ['', Validators.required] });
}

addOption() {
  this.phuongAns.push(this.createOption());
}

removeOption(index: number) {
  if (this.phuongAns.length > 1) {
    this.phuongAns.removeAt(index);
  }
}

submit() {
  if (this.form.valid) {
    this.dialogRef.close(this.form.value);
  }
}

}
