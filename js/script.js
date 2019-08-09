
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
          show_loading();
        },
        data: {
            'apikey': '62185f40',
            'type': 'movie',
            's': $('#search-input').val()
        },
        success: function(result){
            // $("div.modal-backdrop.fade.show").remove();
            // $("div.swal2-container").remove();
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
                                <a href="#" class="btn btn-primary see-detail" attr_data="`+ data.imdbID +`" data-toggle="modal" data-target="#exampleModal">
                                    See Details
                                </a>
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

$('#search-result').on('click', '.see-detail', function() {
    $('.modal-title').html('...');
    $('div.modal-body').html('...');
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
          show_loading();
        },
        data: {
            'apikey': '62185f40',
            'type': 'movie',
            'i': $(this).attr('attr_data'),
        },
        success: function(result){
            // $("div.modal-backdrop.fade.show").remove();
            // $("div.swal2-container").remove();
            if (result.Response=='True') {
                $('.modal-title').html(result.Title);
                $('div.modal-body').html(`
                    <div class="row">
                        <div class="col-3">
                            <img src="`+ result.Poster +`" width="100px">
                        </div>
                        <div class="col">
                            <label>`+ result.Title +`</label>
                            <br>
                            <label>Released : `+ result.Released +`</label>
                            <br>
                            <label>Runtime : `+ result.Runtime +`</label>
                            <br>
                            <label>Genre : `+ result.Genre +`</label>
                            <br>
                            <label>Director : `+ result.Director +`</label>
                            <br>
                            <label>Actors : `+ result.Actors +`</label>
                            <br>
                            <label>Production : `+ result.Production +`</label>
                        </div>
                    </div>
                `);
            } else {
                alert(result.Error);
            }
        },
    });

});

$('.navbar-brand').on('click', function() {
    show_loading();
    $('#main-content').html('');
    $('#main-content').load('home.html');
});

$('.nav-page-search').on('click', function() {
    show_loading();
    $('#main-content').html('');
    $('#main-content').load('search.html');
});

$('.nav-page-about').on('click', function() {
    show_loading();
    $('#main-content').html('');
    $('#search-result').html('');
    $('#main-content').load('about.html');
});

$('.nav-item').on('click', function() {
    $('.nav-item').removeClass('active');
    $(this).addClass('active');
});

function show_loading() {
    let timerInterval
    Swal.fire({
      html: 'Please Wait...',
      timer: 3000,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          Swal.getContent().querySelector('strong')
            .textContent = Swal.getTimerLeft()
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.timer
      ) {
        // console.log('I was closed by the timer')
      }
    })
};