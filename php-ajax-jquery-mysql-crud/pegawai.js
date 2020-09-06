$(document).ready(function(){
    var url = 'http://localhost/php/php-ajax-jquery-mysql-crud/pegawai.json';
    $.getJSON(url, function(json) {
        var tr = [];
        var pegawai = json.data;
        for (var i = 0 ; i < pegawai.length; i++)
        {
            var d = pegawai[i];
            tr += '<tr><td>'+ d.nama +'</td><td>'+ d.nip+'</td><td>'+ d.kantor+'</td><td>'+ d.homebase+'</td></tr>';
        }
        // $.each(pegawai, function(i, data){
        //     tr += '<tr><td>'+ data.id+'</td><td>'+ data.nama+'</td><td>'+ data.nip+'</td><td>'+ data.kantor+'</td><td>'+ data.homebase+'</td></tr>';
        // });
        $('#data-pegawai tbody').append(tr);
        
    });
});