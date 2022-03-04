$(function() {
    //GET/READ for create new tweet. This function posts the information such as user id
    //username, time of tweet, and tweet into a table
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('#create-table>tbody');
                

                tbodyEl.html('');

                response.products.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                    <td><input type="text" class="id form-control" value= "' + product.id + '"></td>\
                    <td><input type="text" class="user form-control" value= "' + product.user + '"></td>\
                    <td><input type="text" class="time form-control" value="' + product.time +'"></td>\
                    <td><input type="text" class="time form-control" value="' + product.text +'"></td>\
                    </tr>\
                    ');
                });
            }
        });
    });

    //Create/post creat-input. This function gets the users information such as time of post, post
    //user ID, and username
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;

        var id =$('#id');
        var user = $('#user');
        var time = dateTime;
        var text = $('#text');

        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: id.val(), user: user.val(), time: time, text: text.val() }),
            success: function(response) {
                console.log(response);
                id.val('');
                user.val('');
                text.val('');
                $('#submit-button').click();
                $('#submit-button').click();
            }
        });
    });
    
    //GET/READ for get tweet. This method is supposed to get the users ID for the text box
    //and create a table containing the user tweet information when the function
    //is successfully run
        $('#tweet-button').click( function(event) {
            event.preventDefault();
            var tweetID = $('#idTweet').val();

            $.ajax({
                url: '/productsTweet' + tweetID,
                method: 'GET',
                contentType: 'application/json',
                
                success: function(response) {
                    var tbodyEl = $('#tweet-table>tbody');
                    
                    tbodyEl.html('');
    
                    response.products.forEach(function(products) {
                        tbodyEl.append('\
                        <tr>\
                        <td><input type="text" class="time tweet-form" value="' + products.time +'"></td>\
                        <td><input type="text" class="time tweet-form" value="' + products.text +'"></td>\
                        </tr>\
                        ');
                    });
                }
            });
        });



        $(function() {
            //Update method. This method is supposed to get the text inputted into the textbox for
            //new username and the old username
            $('#update-form').on('submit', function(event) {
               event.preventDefault();
               var currentUser = $('#currentUser').val();
               var newUser = $('#newUser').val();
               console.log('see ajax call if working');
               
               $.ajax({
                   url: '/productupdate',
                   method: 'POST',
                   contentType: 'application/json',
                   data: JSON.stringify({ newUser: newUser, currentUser: currentUser}),
                   success: function(response) {
                       console.log('it worked');
                       console.log(response)
                    //    $('#get-button').click();
                   }
               });
            });
        });

    //Delete tweet. This function takes in the users id 
    //and then references the delete function in .ajax for the 
    //code to go to
    $("#delete-button").click(function(event) {
        event.preventDefault();
        var id = $('#idGiven').val();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});
