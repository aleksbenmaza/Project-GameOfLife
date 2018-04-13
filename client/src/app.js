/* Projet - Le code du stagiaire 
~ Lisez le README.md pour plus d'informations ~
*/

import gameServer from './gameServer'

const seedURL = './seeds/seed1.seed'
const updateTime = 1000

const line = `<div id=":y" class="row"><\div>`
const cell = `<div id=":y-:x" class="col-sm"><\div>`

const aliveCellColor = '#06fe00'
const deadCellColor  = '#ffffff'


for(var y = 0; y <= 65; ++y) {
      $('#grid').append(line.replace(':y', y))
      for(var x = 0; x <= 35; ++x)
        $('#' + y).append(cell.replace(':y', y).replace(':x', x))
}

gameServer.onMessage = (message) => {
    const messageData = message.data

    for(const cell of messageData)
      $('#' + cell.y + '-' + cell.x).css('color', cell.alive ? aliveCellColor : deadCellColor)
    // console.log('LA DATA', messageData)
}

gameServer
    .loadSeed(seedURL)
    .then((seed) => {
        /* 
           Je reçois bien une seed ici !
        */
        gameServer.init(seed)
                  .then() // On m'a dit d'utiliser ça mais ça retourne RIEN
    })
    .catch((error) => {
        console.error(error)
    })

const interval = setInterval(() => {
    gameServer.next()
}, updateTime)
