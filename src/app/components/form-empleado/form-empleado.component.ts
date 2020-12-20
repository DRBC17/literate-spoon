import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.scss']
})
export class FormEmpleadoComponent implements OnInit {
  createEmpleadoForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  titulo: string = 'Agregar';

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _empleadoService: EmpleadoService,
    private activateRoute: ActivatedRoute
  ) {
    this.buildForm();


    this.cargarDatos();
  }

  ngOnInit(): void { }

  buildForm() {
    this.createEmpleadoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  cargarDatos() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.titulo = 'Editar';
      this.loading = true;
      this._empleadoService.getEmpleado(id).subscribe((res) => {
        this.createEmpleadoForm.patchValue({
          nombre: res.payload.data()['nombre'],
          apellido: res.payload.data()['apellido'],
          documento: res.payload.data()['documento'],
          salario: res.payload.data()['salario'],
        });
        this.loading = false;
      }, (err) => {
        this.loading = false;
        console.error(err);

      })
    }
  }

  agregarEditarEmpleado(form: Empleado) {
    this.submitted = true;

    if (this.createEmpleadoForm.invalid) {
      return;
    }

    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (id === null) {
      this.agregarEmpleado(form);
    } else {
      this.editarEmpleado(form);
    }
  }
  agregarEmpleado(form: Empleado) {

    const { nombre, apellido, documento, salario } = form;
    const empleado: Empleado = {
      nombre,
      apellido,
      documento,
      salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    this.loading = true;
    this._empleadoService
      .agregarEmpleado(empleado).subscribe(
        (res) => {
          this.loading = false;
          this.toastr.success("Empleado creado con exito", "Empleado creado")
          this.router.navigate(['/list-empleados']);
        },
        (err) => {
          console.log(err);
          this.loading = false;
          this.toastr.error(err, "Error al crear al empleado")
        }
      )
  }

  editarEmpleado(form: Empleado) {
    const { nombre, apellido, documento, salario } = form;
    const id = this.activateRoute.snapshot.paramMap.get('id');
    const empleado: Empleado = {
      nombre,
      apellido,
      documento,
      salario,
      fechaActualizacion: new Date(),
    };
    this.loading = true;
    this._empleadoService.actualizarEmpleado(id, empleado).subscribe(
      (res) => {
        this.loading = false;
        this.toastr.success("Empleado editado con exito", "Empleado editado")
        this.router.navigate(['/list-empleados']);
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.toastr.error(err, "Error al editar el empleado")
      }
    )
  }



}
