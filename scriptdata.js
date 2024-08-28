$(document).ready( function () {
    $('#tableFuncioanario').DataTable();
} );

var table = new DataTable('#tableFuncioanario', {
    language: {
        url: '//cdn.datatables.net/plug-ins/2.0.5/i18n/pt-BR.json',
    },
});

//veiculo
$(document).ready( function () {
    $('#tableVeiculo').DataTable();
} );

var table = new DataTable('#tableVeiculo', {
    language: {
        url: '//cdn.datatables.net/plug-ins/2.0.5/i18n/pt-BR.json',
    },
});