import { Component, OnInit } from '@angular/core';
import { CatService } from '../cat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDialogService } from '../../shared/modal-dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LogService } from 'src/app/shared/log.service';

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
        private dialogRef: MatDialogRef<CreateCatComponent>,
        private logService: LogService
    ) { }

    ngOnInit(): void {
        this.catForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            color: '',
            breed: '',
            birthdate: ''
        });
    }

    onSubmit(): void {
        this.logService.log(`Form submitted :${this.catForm.value}`, 'blue');
        if (this.catForm.valid) {
            this.catService.addCat(this.catForm.value).subscribe(() => {
                this.dialogRef.close();
            });
        }
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
