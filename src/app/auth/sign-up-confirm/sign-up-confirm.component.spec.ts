import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpConfirmComponent } from './sign-up-confirm.component';

describe('SignUpConfirmComponent', () => {
    let component: SignUpConfirmComponent;
    let fixture: ComponentFixture<SignUpConfirmComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SignUpConfirmComponent]
        });
        fixture = TestBed.createComponent(SignUpConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
