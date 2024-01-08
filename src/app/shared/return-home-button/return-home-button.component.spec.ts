import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReturnHomeButtonComponent } from './return-home-button.component';

describe('ReturnHomeButtonComponent', () => {
    let component: ReturnHomeButtonComponent;
    let fixture: ComponentFixture<ReturnHomeButtonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ReturnHomeButtonComponent]
        });
        fixture = TestBed.createComponent(ReturnHomeButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
