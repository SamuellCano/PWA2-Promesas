/*Ejercicio 1: Promesas Encadenadas
Crea una función que realice las siguientes tareas:
Inicia una promesa que se resuelva después de 2 segundos con un número aleatorio entre 1 y 100.
Luego, toma ese número y crea una segunda promesa que se resuelva después de 3 segundos con el resultado de elevar ese número al cuadrado.
Finalmente, toma el resultado de la segunda promesa y crea una tercera promesa que se resuelva después de 1 segundo con la raíz cuadrada del número resultante.*/

function E1(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(Math.floor((Math.random() * (100 - 1 + 1)) + 1));
        },2000)
    }).then((random) => {
        console.log("random: "+random);
        return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(random ** 2);
        },3000)
    })}).then((cuadrado) => {
        console.log("cuadrado de random: "+cuadrado);
        return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(Math.sqrt(cuadrado));
        },1000)
    })});
}

E1().then((resultado) => console.log("Raiz del cuadrado de random: "+resultado));

/*Ejercicio 2: Promesa de Múltiples Solicitudes
Crea una función que realice las siguientes tareas:
Recibe un array de URLs como argumento.
Utiliza fetch y promesas para realizar una solicitud GET a cada URL en el array.
Devuelve una promesa que se resuelva con un array de los resultados de todas las solicitudes.*/

const urls = ["https://reqres.in/api/users?page=1","https://reqres.in/api/users?page=2","https://reqres.in/api/users/2"];

function E2(array){
    let listPromises = [];
    array.forEach(url => {
        listPromises.push(
        new Promise((resolve, reject) => {
            resolve(
                fetch(url)
                .then((resp) => resp.json())
                .catch((err) => err)
            );
        }));
    });
    return Promise.all(listPromises
        ).then((values =>{
            return new Promise((resolve, reject) => {
                resolve(values)  
            });
        }));
}

E2(urls).then((resultado) => console.log(resultado));

/*Ejercicio 3: Promesas Paralelas
Crea una función que realice las siguientes tareas:
Recibe un array de funciones que devuelven promesas como argumento.
Ejecuta todas las funciones en paralelo y espera a que todas las promesas se resuelvan.
Devuelve una promesa que se resuelva con un array de los resultados de todas las promesas.*/
function sumar(num1, num2){
    return new Promise((resolve, reject) => {
       resolve(num1 + num2)
    });
}
function restar(num1, num2){
    return new Promise((resolve, reject) => {
        resolve(num1 - num2)   
    });
}

const funciones = [sumar(5,4), restar(10,5)];

function E3(array){
    return Promise.all(array
        ).then((values =>{
            return new Promise((resolve, reject) => {
                resolve(values)  
            });
        })
    );
}

E3(funciones).then((resultado) => console.log(resultado));


/*Ejercicio 4: Promesas en Cadena con Retraso
Crea una función que realice las siguientes tareas:
Recibe un número n como argumento.
Utiliza un bucle para crear una cadena de promesas, donde cada promesa se resuelve después de N segundos con el número actual en el bucle.
Cada promesa debe imprimir el número en la consola antes de resolverse.
Finalmente, devuelve una promesa que se resuelva después de N segundos con el mensaje "Todas las promesas se resolvieron".*/

function E4(n){
    let listPromises = [];
    let segundos = 1000;
    for (i = 0; i < n; i++) {
        console.log("Promesa "+(i+1)+" se resolverá en "+segundos+" milisegundos");
        listPromises.push(
            new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve("Promesa resuelta");
                },segundos+=1000)
            })
        );
    } 
    return Promise.all(listPromises
        ).then((values =>{
            console.log(values);
            return new Promise((resolve, reject) => {
                setTimeout(()=>{resolve("Todas las promesas se resolvieron"),segundos+=1000})
            });
        })
    );
}

E4(4).then((resultado) => console.log(resultado));



/*Ejercicio 5: Promesa con Cancelación
Crea una función que realice las siguientes tareas:
Inicia una promesa que se resuelva después de 5 segundos con un mensaje.
Si se llama a una función cancel antes de que se cumplan los 5 segundos, la promesa debe rechazarse con el mensaje "Promesa cancelada".*/
let contador = 4;
let contadorInterval;
let completarPromesa = true;

function CrearPromesa(){
return new Promise((resolve, reject) => {
const timer = setTimeout(() => {
    if (completarPromesa) {
        alert("La promesa ha sido completada en 5 segundos")
        resolve("La promesa ha sido completada en 5 segundos");
    } else {
        reject(("La promesa ha sido cancelada"));
    }
}, 5000); 

    cancelarPromesa = () => {
        completarPromesa = false;
        contador = 0;
    };
    });
}

CrearPromesa().then((resultado) => console.log(resultado));

function actualizarContador() {
    document.getElementById("contador").textContent = contador;
    if (contador === 0) {
        clearInterval(contadorInterval);
        document.getElementById("cancelarBtn").disabled = true;
    } else {
        contador--;
    }
}

document.getElementById("cancelarBtn").addEventListener("click", () => {
    cancelarPromesa();
    alert("La promesa ha sido cancelada.");
});

contadorInterval = setInterval(actualizarContador, 1000);
document.getElementById("cancelarBtn").disabled = false;

