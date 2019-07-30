
function search_movies(){
    $('#search-result').html('');
    $('#empty-search-result').html('');
    $.ajax({
        url: 'https://www.omdbapi.com', 
        type: 'GET',
        dataType: 'jsonp',
        cors: true ,
        contentType:'application/json',
        secure: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa(""));
        },
        data: {
            'apikey': '62185f40',
            'type': 'movie',
            's': $('#search-input').val()
        },
        success: function(result){
            if (result.Response == 'True') {
                let movies = result.Search;
                console.log(movies);
                $.each(movies, function( i, data ) {
                    if (data.Poster=='N/A') {
                        data.Poster = 'https://via.placeholder.com/300x400.png?text=Image+Not+Available'
                    }
                    $('#search-result').append(`
                        <div class="col-md-3">
                            <div class="card mb-5 mx-1">
                                <img class="card-img-top" src="`+ data.Poster +`" alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-title">`+ data.Title +`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                <a href="#" class="btn btn-primary see-detail">See Details</a>
                                </div>
                            </div>
                        </div>
                    `)
                });
            } else {
                $('#search-result').empty();
                $('#empty-search-result').empty();
                $('#empty-search-result').append(`
                    <hr>
                    <h5 class="text-center">Movie with title "`+ $('#search-input').val() +`" was not found.</h5>
                `);
            }
        }
    });
}

$('#search-button').on('click', function(data) {
    search_movies();
})

$('#search-input').keyup(function( event ) {
    if ( event.which == 13 ) {
        search_movies();
    }
});

$('.see-detail').on('click', function() {
    console.log('hello');
});

$('.nav-page-about').on('click', function() {
    // $('body').html('');
    // $('body').load('about.html');
});

$('.nav-item').on('click', function() {
    $('.nav-item').removeClass('active');
    $(this).addClass('active');
});
