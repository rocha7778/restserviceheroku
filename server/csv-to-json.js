const request = require('request')
const csv = require('csvtojson')
const imageService = require('../fileUpload/saveFile')


const fs = require('fs');



var prueba = csv()
    .fromStream(request.get('https://www.dropbox.com/s/4ypgtwex6ypjvnz/prueba.csv'))
    .subscribe((json) => {
        return new Promise((resolve, reject) => {
            if (!json) {
                reject("No se pudo convertir el archivo");
            } else {
                resolve(resolve)
            }

        })
    });


prueba.then((resolve, reject) => {
    //  console.log(resolve);



})