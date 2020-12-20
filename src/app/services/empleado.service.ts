import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }

  agregarEmpleado(empleado: Empleado): Observable<any> {
    return from(this.firestore.collection('empleados').add(empleado));
  }
  getEmpleados(): Observable<any> {
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
  }
  eliminarEmpleado(id: string): Observable<any> {
    return from(this.firestore.collection('empleados').doc(id).delete());
  }
  getEmpleado(id: string): Observable<any> {
    return this.firestore.collection('empleados').doc(id).snapshotChanges()
  }
  actualizarEmpleado(id: string | null, empleado: Empleado) {
    return from(this.firestore.collection('empleados').doc(id).update(empleado));
  }
}
