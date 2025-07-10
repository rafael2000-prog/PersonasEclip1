import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Contacto {
  id?: string;
  nombre: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  private URL_BASE = "http://localhost:8081/demo66/rest";

  constructor(private http: HttpClient) { }
  private firestore = inject(Firestore);

  addContacto(nombre: string, direccion: string){

    return addDoc(collection(this.firestore, 'contactos'), {'nombre': nombre, 'direccion': direccion})

  }

  getContactos(): Observable<any[]> {
    const contactosRef = collection(this.firestore, 'contactos');
    return collectionData(contactosRef, { idField: 'id' });
  }

  updateContacto(contacto: Contacto) {
    const contactoRef = doc(this.firestore, `contactos/${contacto.id}`);
    const { id, ...data } = contacto;
    return updateDoc(contactoRef, data);
  }

  deleteContacto(id: string) {
    const contactoRef = doc(this.firestore, `contactos/${id}`);
    return deleteDoc(contactoRef);
  }

  addPersona (nombre: string, direccion: string, cedula: string): Observable<any[]>{
    let persona = {
      "cedula": cedula,
      "nombre": nombre,
      "direccion": direccion
    }
    return this.http.post<any> (this.URL_BASE+"/personas", persona)
  }

  getPersonas(): Observable<any[]> {
    console.log(this.URL_BASE+"/personas")
    return this.http.get<any[]>(this.URL_BASE+"/personas")
  }
}
