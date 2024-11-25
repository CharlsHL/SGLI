import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCrearEditarClienteComponent } from './pop-up-crear-editar-cliente.component';

describe('PopUpCrearEditarClienteComponent', () => {
  let component: PopUpCrearEditarClienteComponent;
  let fixture: ComponentFixture<PopUpCrearEditarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpCrearEditarClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCrearEditarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
