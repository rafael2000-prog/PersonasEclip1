import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactosService } from '../services/contactos.service';


@Component({
  selector: 'app-hola-ups',
  templateUrl: './hola-ups.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class HolaUpsComponent {
  texto: string = 'Programacion';
  nombre: string = '';
  cedula: string = '';
  direccion: string = '';
  listaDatos: { nombre: string; direccion: string }[] = [];
  editIndex: number | null = null;

  contactos: any[] = [];
  editId: string | null = null;
  contactosBack: any[] = [];
  
  constructor(private contactosServices:ContactosService){}

  async ngOnInit() {

    this.cargarPersonas();

    this.contactosServices.getContactos().subscribe(data => {
      this.contactos = data;
    });

    //this.contactos = await this.contactosServices.getContactos()
    //console.log("this.contactos", this.contactos)

    /*if (typeof window !== 'undefined' && localStorage) {
      const datos = localStorage.getItem('datos');
      this.listaDatos = datos ? JSON.parse(datos) : [];
    }*/
  }

  cargarPersonas() {
    this.contactosServices.getPersonas().subscribe({
      next: (data) => this.contactosBack = data,
      error: (err) => console.error('error en consulta', err)
    });
  }


  guardar() {
    //console.log('Guardando Angular......','Nombre:', this.nombre, 'Dirección:', this.direccion);

    //const registro = {nombre: this.nombre, direccion: this.direccion};

    //const datos = localStorage.getItem("datos");
    //const lista = datos ? JSON.parse(datos):[];

    /*
    if (this.editIndex !== null) {
      this.listaDatos[this.editIndex] = registro;
      this.editIndex = null;
    } else {
      this.listaDatos.push(registro);
    }

    //this.listaDatos.push(registro);
    lista.push(registro);

    localStorage.setItem('datos',JSON.stringify(lista));
    localStorage.setItem('datos', JSON.stringify(this.listaDatos));

    console.log('datos guardados', lista);
    */
    if (this.editId) {
      this.contactosServices.updateContacto({id: this.editId, nombre: this.nombre, direccion: this.direccion}).then(() => {
        this.resetFormulario();
      });
    } else {
      this.contactosServices.addContacto(this.nombre, this.direccion).then(() => {
        this.resetFormulario();
      });
    }

    this.contactosServices.addPersona(this.nombre, this.direccion, this.cedula).subscribe({
      next: () => {
        this.cargarPersonas();
      },
      error: (err) => console.error('Error al guardar persona', err)
    });
    
  }

  /*editar(index: number) {
    const reg = this.listaDatos[index];
    this.nombre = reg.nombre;
    this.direccion = reg.direccion;
    this.editIndex = index;
  }

  eliminar(index: number) {
    this.listaDatos.splice(index, 1);
    localStorage.setItem('datos', JSON.stringify(this.listaDatos));
  }*/

    editar(contacto: any) {
      this.editId = contacto.id;
      this.nombre = contacto.nombre;
      this.direccion = contacto.direccion;
    }

  eliminar(id: string) {
    this.contactosServices.deleteContacto(id);
  }

  resetFormulario() {
    this.nombre = '';
    this.direccion = '';
    this.editId = null;
  }

}
