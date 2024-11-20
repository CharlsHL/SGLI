import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCrearEditarEmpleadoComponent } from './pop-up-crear-editar-empleado.component';

describe('PopUpCrearEditarEmpleadoComponent', () => {
  let component: PopUpCrearEditarEmpleadoComponent;
  let fixture: ComponentFixture<PopUpCrearEditarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpCrearEditarEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCrearEditarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
