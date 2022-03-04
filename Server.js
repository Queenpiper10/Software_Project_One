var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//array of users and user info
var products = [
    {
       id: 2384071,
       user: "timoreilly",
       time: "2013-03-13 23:01:36",
       text: "Was wondering why @billgates cc'd me on story abt @MSFTResearch cool viral search tool; discovered I'm featured in it http:\/\/t.co\/g6oSeEIEUr"
    },
    {
        id: 2408481,
        user: 'MarkUry',
        time: '2013-03-13 22:16:59',
        text: "The one page everyone in Hollywood is watching http:\/\/t.co\/jaX0uQqk4W  This is the film industry's Pebble Watch moment."
    },
    {
        id: 633,
        user: 'zephoria',
        time: '2013-03-13 13:16:30',
        text: 'I reflected on why the #sxsw induction means so much to me and it took &gt;140 chars: http:\/\/t.co\/rJWz0jKrqf'
    },
    {
        id: 14078377,
        user: 'SarahPrevette',
        time: '2013-03-12 13:29:12',
        text: 'How to Create an Early Stage Pitch Deck\nhttp:\/\/t.co\/TdYB5I6xBl\n(Great advice from @ryanspoon )'
    },
    {
        id: 15414807,
        user: 'johnmaeda',
        time: '2013-03-12 11:05:00',
        text: '1st gear Empathy, 2nd gear Prototype, 3rd gear Align w\/ Reality http:\/\/t.co\/QxDfp2GLcQ by @Jabaldaia http:\/\/t.co\/CLcxKevjrY'
    }
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

//gets the product array info
app.get('/products', function(req, res) {
    res.send({ products: products});
});


//get user information and pushes it to a table
app.post('/products', function(req, res) {
    var productId = req.body.id;
    var productUser = req.body.user;
    var productText = req.body.text;
    var productTime = req.body.time;

    products.push({
        id: productId,
        user: productUser,
        text: productText,
        time: productTime
    });

    res.send('Successfully created product');
});

//get user tweet and time. This function searches through the 
//products array for the entered users ID and, if found, displays the 
//users tweet and time of tweet found at that index to a table
app.get('/productsTweet:tweetID', function(req, res) {
    console.log
    var tweetID = req.body.tweetID;

    for(var i=0; i<products.length; i++) {
        if(products[i].id === Number(tweetID)) {
                res.send({time :products[i].time, text: products[i].text});
                res.send('Successfully created product');
        }
   }
    
});

//this function searches the products array for the users
//current ID, and if found, replaces the users current username
//with the one the user entered for new username in the text box
app.post('/productupdate', function(req, res) {
    var currentUser = req.body.currentUser;
    var newUser = req.body.newUser;
    console.log("this is maddy app")    
    res.send("this is maddy from server")
   
     var found = false;
         for(var i=0; i<products.length; i++) {
             Console.log(products[i].user)
             if(!found && products[i].user == currentUser) {
                 products[i].user = newUser;
                 res.send('Successfully updated product');
            }
             else {
                 res.send('Did not find user ID :(');
            }
        }
});

//delete tweet. This function looks through the products array 
//for the entered user id and, if found, then deletes that object at
//that index from the array
app.delete('/products/:id', function (req, res) {
    var id = req.params.id;
    var found = false;

        for(var i=0; i<products.length; i++) {
            if(!found && products[i].id ===  Number(id)) {
                products.splice(i, 1);
                res.send('Successfully deleted product!');
            }
            else {
                res.send('Did not Delete product :(');
            }
        }
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
