import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { By }              from '@angular/platform-browser';

import { IntroductionComponent } from './introduction.component';

describe('IntroductionComponent', () => {
    let component:    IntroductionComponent;
    let fixture:      ComponentFixture<IntroductionComponent>;
    let el:           HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ IntroductionComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });

    it('should display introduction if app->state equals home', () => {
      component.state = 'home';
      fixture.detectChanges();
      expect(el.querySelector('h5')).not.toBeNull();
      expect(el.querySelector('h5').textContent).toContain('Welcome to the FIT Publications Database');
    });

    it('should not display introduction if app->state DOES NOT equal home', () => {
      component.state = 'results';
      fixture.detectChanges();
      expect(el.querySelector('h5')).toBeNull();
    });

});
