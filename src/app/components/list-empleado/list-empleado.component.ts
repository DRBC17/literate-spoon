import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';


@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.scss'],
})
export class ListEmpleadoComponent implements OnInit {
  empleados: Empleado[];
  loading: boolean = true;

  constructor(
    private firestore: AngularFirestore,
    private _empleadoService: EmpleadoService,
    private toastr: ToastrService
  ) {
    this.empleados = []
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(
      (res) => {
        this.empleados = [];

        if (res) {
          res.map((empleado) => {
            this.empleados.push({
              id: empleado.payload.doc.id,
              ...empleado.payload.doc.data(),
            });
          })
        }
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.toastr.error(err, "Error al obtener los empleados")
      }
    );
  }

  eliminarEmpleado(id: string) {
    this.loading = true;
    this._empleadoService
      .eliminarEmpleado(id)
      .subscribe(
        (res) => {
          this.loading = false;
          this.toastr.success("Empleado eliminado con exito", "Empleado eliminado")
        },
        (err) => {
          console.log(err);
          this.loading = false;
          this.toastr.error(err, "Error al eliminar el empleado")
        });
  }
}
