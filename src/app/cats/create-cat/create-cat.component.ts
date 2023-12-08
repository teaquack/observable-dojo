import { Component, OnInit } from '@angular/core';
import { CatService } from '../cat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatDialogService } from '../cat-dialog.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'dojo-create-cat',
    templateUrl: './create-cat.component.html'
})
export class CreateCatComponent implements OnInit {
    pageTitle = 'Add a new cat';
    catForm!: FormGroup;

    constructor(
        private catService: CatService,
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<CreateCatComponent>
    ) { }

    ngOnInit(): void {
        this.catForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            color: '',
            breed: '',
            dateOfBirth: ''
        });
    }

    onSubmit(): void {
        console.log('Form submitted :', this.catForm.value);
        if (this.catForm.valid) {
            this.catService.addCat(this.catForm.value);
            this.dialogRef.close();
        }
    }
}
