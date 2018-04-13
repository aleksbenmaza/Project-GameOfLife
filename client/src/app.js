/* Projet - Le code du stagiaire 
~ Lisez le README.md pour plus d'informations ~
*/

import gameServer from './gameServer'

const seedURL = './seeds/seed1.seed'
const updateTime = 1000

const emptyCellColor = '#dcdcdc'
const aliveCellColor = '#06fe00'
const deadCellColor  = '#000000'

const line = `<div id=":y" class="row" style="height:` + 100/72 + `%; background-color:` + emptyCellColor +`"><\div>`
const cell = `<div id=":y_:x" class="col"><\div>`

for(var y = -65; y <= 65; ++y) {
      $('#grid').append(line.replace(':y', y))
      for(var x = -35; x <= 35; ++x)
        $('#' + y).append(cell.replace(':y', y).replace(':x', x))
}

gameServer.onMessage = (message) => {
    const messageData = message.data
    const cellLines = JSON.parse(messageData).cells

    for(const y in cellLines)
      for(const x in cellLines[y] || {})
        $('#' + y + '_' + x).css('background-color', cellLines[y][x].alive ? aliveCellColor : deadCellColor)
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
