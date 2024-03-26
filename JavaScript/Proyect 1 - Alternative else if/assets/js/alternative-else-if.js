// Sin usar If Else, o Swhitch, únicamento objetos
dia = 10; // 0:Domingo, 1 Lunes...

let week = {
    0:'Domingo',
    1:'Lunes',
    2:'Martes',
    3:'Miercoles',
    4:'Jueves',
    5:'Viernes',
    6:'Sábado',
}; 

console.log(week[dia] || 'Día no valido');


