// const response = await fetch('https://rickandmortyapi.com/api/character/1')
// const { name, status, species} = await response.json();

// console.log(name, status, species)

// const text = await Deno.readTextFile('./archivo.txt')
// console.log(text)

import { serve, Response } from 'https://deno.land/std/http/server.ts';
import { getDinos, createDinos} from './database.ts'

const server = serve({port: 3000})
console.log('Running http://localhost:3000/')

for await (const res of server){

    if (res.method === 'GET') {
        const response: Response = {
            body: JSON.stringify({data: await getDinos()})
        };
        res.respond(response)
    } else {
        const body = new TextDecoder().decode(await Deno.readAll(res.body))
        const data = new URLSearchParams(body);
        const doc = {
            name: data.get('name')!, 
            era: data.get('era')!, 
            diet: data.get('diet')!, 
            region: data.get('regions')!, 
            feetTall: parseInt(data.get('feetTall') || '0'), 
            feetLong: parseInt(data.get('feetLong') || '0'), 
            pounds: parseInt(data.get('pounds') || '0')
        }
        const dinoCreate = await createDinos(doc);
        const response: Response = {
            body: JSON.stringify({data: dinoCreate})
        };
        res.respond(response)

    }




    // switch(request.url){
    //     case '/':
    //         request.respond({ body: "Hola desde deno!"})
    //         break;
    //     case '/html':
    //         const html = await Deno.readTextFile('./index.html')
    //         request.respond({ body: html})
    //         break;
    //     case '/json':
    //         const data = JSON.stringify({data: "Hola API"})
    //         request.respond({ body: data})
    //         break;
    //     default:
    //         request.respond({ body: "Hola desde deno!"})
    //         break;

    // }
}

