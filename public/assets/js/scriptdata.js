

var table = new DataTable('#tableFuncioanarios', {
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.0.5/i18n/pt-BR.json',
    },
    columnDefs: [
        { targets: '_all', render: function(data, type, row) {
            return '<div style="text-align: center;">' + data + '</div>';
        } },
        { targets: 5, orderable: false }, //retira paginação
    ], //justifica texto do tr
    headerCallback: function( thead, data, start, end, display ) {
        $('th', thead).each(function() {
            $(this).html('<div style="text-align: center;">' + $(this).html() + '</div>');
        });
    } //justifica texto do th
});



var table = new DataTable('#tableVeiculos', {
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.0.5/i18n/pt-BR.json',
    },
    columnDefs: [
        { targets: '_all', render: function(data, type, row) {
            return '<div style="text-align: center;">' + data + '</div>';
        } },
        { targets: 4, orderable: false }, //retira paginação
    ],
    headerCallback: function( thead, data, start, end, display ) {
        $('th', thead).each(function() {
            $(this).html('<div style="text-align: center;">' + $(this).html() + '</div>');
        });
    }
});


var table = new DataTable('#tableClientes', {
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.0.5/i18n/pt-BR.json',
    },
    columnDefs: [
        { targets: '_all', render: function(data, type, row) {
            return '<div style="text-align: center;">' + data + '</div>';
        } },
        { targets: 5, orderable: false }, //retira paginação
    ],
    headerCallback: function( thead, data, start, end, display ) {
        $('th', thead).each(function() {
            $(this).html('<div style="text-align: center;">' + $(this).html() + '</div>');
        });
    }
});


var table = new DataTable('#tableEstoque', {
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.0.5/i18n/pt-BR.json',
    },
    columnDefs: [
        { targets: '_all', render: function(data, type, row) {
            return '<div style="text-align: center;">' + data + '</div>';
        } },
        { targets: [1, 6], orderable: false }, //retira paginação
    ],
    headerCallback: function( thead, data, start, end, display ) {
        $('th', thead).each(function() {
            $(this).html('<div style="text-align: center;">' + $(this).html() + '</div>');
        });
    }
});
