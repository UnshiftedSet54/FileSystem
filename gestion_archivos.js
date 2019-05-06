const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');
/* const {
    exec
} = require('child_process'); */

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let status = [];
let reqmsg = 'Ingrese el nombre del archivo: ';
const mainDialog = `
-------- Sistema y Gestion de Archivos -------- 

1. Crear Archivo.
2. Leer Archivo.
3. Abrir Archivo.
4. Cerrar Archivo.
5. Destruir Archivo.
6. Modificar.
0. Salir.

Ingrese su opcion: `;

function crearArchivo(filename) {
    fs.exists('C:/Users/samu_/Desktop/Ficheros/' + filename, (exists) => {
        if (exists == false) {
            rl.question('Ingrese el texto deseado: \n', (userInput) => {
                fs.writeFile('C:/Users/samu_/Desktop/Ficheros/' + filename, userInput, (error) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log("\n----Archivo creado existosamente----\n");
                        main();
                    }
                });
            });
        } else {
            console.log('Error: el archivo ya existe.');
            main();
        }
    });
}

function leerArchivo(filename) {
    fs.exists('C:/Users/samu_/Desktop/Ficheros/' + filename, (exists) => {
        if (exists) {
            fs.readFile('C:/Users/samu_/Desktop/Ficheros/' + filename, 'utf-8', (error, file) => {
                if (error) {
                    console.error(error.message);
                    main();
                } else {
                    console.log("\n----Archivo leido exitosamente----\n");
                    main();
                }
            });
        } else {
            console.log('Error: el archivo no existe.');
            main();
        }
    });
}

function abrirArchivo(filename) {
    fs.open('C:/Users/samu_/Desktop/Ficheros/' + filename, 'r', (error, fd) => {
        if (!error) {
            status.push({
                name: filename,
                fdes: fd
            });
            fs.readFile('C:/Users/samu_/Desktop/Ficheros/' + filename, 'utf-8', (error, file) => {
                if (error) {
                    console.error(error.message);
                    main();
                } else {
                    console.clear();
                    console.log('\nMostrando el contenido del archivo... \n\n' + file);
                    main();
                }
            });
        } else {
            console.error(error);
        }
    });

    /* window2 = exec('more C:\\Users\\samu_\\Desktop\\Ficheros\\' + filename, {
        shell: true
    });
    main(); */
}

function cerrarArchivo(filename) {
    let fdhelper = status.find((element) => {
        return element.name === filename;
    });
    fs.close(fdhelper.fdes, (error) => {
        if (error) {
            console.error(error);
        } else {
            console.clear();
            console.log('\n----Archivo cerrado exitosamente.----\n ');
            main();
        }
    });
}

async function modArchivo(filename) {
    let path = 'C:/Users/samu_/Desktop/Ficheros/' + filename;
    await fs.readFile(path, 'utf-8', function (err, data) {
        if (err) throw err;
        console.log("Texto original: \n" + data);
    });
    rl.question('\nIngrese el texto modificado: \n', (userInput) => {
        fs.writeFile(path, userInput, function (err) {
            if (err) throw err;
            console.log("\n----Archivo modificado----\n");
        });
    });
}

function destruirArchivo(filename) {
    fs.exists('C:/Users/samu_/Desktop/Ficheros/' + filename, (exists) => {
        if (exists) {
            fs.unlink('C:/Users/samu_/Desktop/Ficheros/' + filename, (error) => {
                if (error) {
                    console.error(error.message);
                    main();
                } else {
                    console.log("\n----El archivo ha sido destruidooooooo! (boom!)----\n");
                    main();
                }
            });
        } else {
            console.log('Error: el archivo no existe.');
            main();
        }
    });
}

function main() {
    rl.question(chalk.green(mainDialog), (userInput) => {
        mainMenu(userInput);
    });
}

function mainMenu(input_str) {
    switch (input_str) {
        case '1':
            rl.question(reqmsg, (userInput) => {
                crearArchivo(userInput);
            });
        case '2':
            rl.question(reqmsg, (userInput) => {
                leerArchivo(userInput);
            });
        case '3':
            rl.question(reqmsg, (userInput) => {
                abrirArchivo(userInput);
            });
            break;
        case '4':
            rl.question(reqmsg, (userInput) => {
                cerrarArchivo(userInput);
            });
            break;
        case '5':
            rl.question(reqmsg, (userInput) => {
                destruirArchivo(userInput);
            });
            break;
        case '6':
            rl.question(reqmsg, (userInput) => {
                modArchivo(userInput);
            });
            break;
        case '0':
            console.clear();
            console.log(chalk.blue.bold('Adios!'));
            //console.log(chalk.bgBlue.bold('Adios!'));
            process.exit(1);
        default:
            console.log('\nIngrese una opcion valida!\n');
            break;
    }
    main();
}

main();