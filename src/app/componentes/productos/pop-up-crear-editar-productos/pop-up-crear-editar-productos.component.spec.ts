import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCrearEditarProductosComponent } from './pop-up-crear-editar-productos.component';

describe('PopUpCrearEditarProductosComponent', () => {
  let component: PopUpCrearEditarProductosComponent;
  let fixture: ComponentFixture<PopUpCrearEditarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpCrearEditarProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCrearEditarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
