
const curso = require('./curso');
var readline = require('readline');
const fs = require('fs');
let [cursoList,notas] = curso;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\033[2J');
console.log("===================INSCRIPCIÓN A CURSOS========================");
console.log("Seleccione el curso al que se desa inscribir:\n");
cursoList.forEach(function(e){
    console.log(e.id+" - "+e.nombre+" - "+e.duracion+" horas "+" - $"+e.valor);
});

rl.question('Seleccione un curso : ', (curso) => {
    cursoExiste = cursoList.find(crs => crs.id == curso);
    if(cursoExiste !== undefined){
        rl.question('Ingrese Su nombre : ', (nombre) => {
            rl.question('Ingrese Su cédula : ', (cedula) => {
                console.log(cursoExiste,nombre,cedula);
                var stream = fs.createWriteStream("inscripcion.txt");
                    stream.once('open', function(fd) {
                    stream.write("Nombre: "+nombre+"\n");
                    stream.write("Cedula"+cedula+"\n");
                    stream.write(JSON.stringify(cursoExiste)+"\n");
                    stream.end();
                    });
                rl.close();
            });
            
            
        });

    }else{
        console.log("El curso seleccionado no existe");
    }

});