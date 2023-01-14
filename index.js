const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var DB = {
    games: [
        {
            id: 2,
            title: 'Call of Duty MW',
            year: 2019,
            price: 60
        },
        {
            id: 45,
            title: 'Sea of Thieves',
            year: 2018,
            price: 98
        },
        {
            id: 33,
            title: 'Minecraft',
            year: 2012,
            price: 120
        },
    ]
}


// End points
app.get('/games', (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
})

app.get('/games/:id', (req, res) => {
    
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{

        var id = parseInt(req.params.id);
        console.log(id)
        
        var game = DB.games.find(g => g.id == id);
        console.log(game)

        if(game != undefined){
            res.statusCode = 200
            res.json(game);
        }else{
            res.sendStatus(404)
        }
    }
})

// Add game
app.post('/game', (req,res) => {
    var {title, year, price} = req.body;

    DB.games.push({
        id: 2323,
        title,
        year, 
        price
    });
    res.sendStatus(200)
})

app.delete('/game/:id', (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        console.log(id)
        var index = DB.games.findIndex(g => g.id == id);
        console.log(index)

        if(index == -1){
            res.sendStatus(404)
        }else{
            DB.games.splice(index, 1);
            res.sendStatus(200)

        }
    }


})

app.put('/game/:id', (req,res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id)
        var game = DB.games.find(g => g.id == id)

        if(game != undefined){
            var {title, year, price} = req.body;

            if(title != undefined){
                game.title = title;
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }

            res.sendStatus(200);
        }else{
            res.sendStatus(400);
        }
    }
})

app.listen(4400, () => {
    console.log('API RODANDO!')
})