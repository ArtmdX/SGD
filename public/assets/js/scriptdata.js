
//serviço***********************************************************************************************************
$(document).ready(function() {
    var table = new DataTable('#tableServicos', {
        language: {
            url: 'https://cdn.datatables.net/plug-ins/2.0.5/i18n/pt-BR.json',
        },
        columnDefs: [
            { targets: '_all', render: function(data, type, row) {
                return '<div style="text-align: center;">' + data + '</div>';
            }},
            { targets: 5, orderable: false }, // Retira paginação
        ],
        headerCallback: function(thead, data, start, end, display) {
            $('th', thead).each(function() {
                $(this).html('<div style="text-align: center;">' + $(this).html() + '</div>');
            });
        }
    });

    // Função para carregar os serviços da API
    async function loadServices() {
        try {
            const response = await fetch('/services');
            const services = await response.json();
            services.forEach(service => {
                table.row.add([
                    service.nr_nota_fiscal,
                    service.id_categoria,
                    service.dt_servico,
                    service.descricao,
                    service.valor,
                    '<button onclick="editService(' + service.nr_nota_fiscal + ')">Editar</button>' +
                    '<button onclick="deleteService(' + service.nr_nota_fiscal + ')">Excluir</button>'
                ]).draw();
            });
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
        }
    }

    loadServices();
});

async function deleteService(id) {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
        try {
            await fetch('/services/' + id, { method: 'DELETE' });
            location.reload(); // Recarrega a página para atualizar a tabela
        } catch (error) {
            console.error('Erro ao excluir serviço:', error);
        }
    }
}

function editService(id) {
    // Implementar a lógica para editar o serviço
    alert('Função de edição não implementada para o serviço ID: ' + id);
}
//serviço***********************************************************************************************************


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
        { targets: 3, orderable: false }, //retira paginação
    ],
    headerCallback: function( thead, data, start, end, display ) {
        $('th', thead).each(function() {
            $(this).html('<div style="text-align: center;">' + $(this).html() + '</div>');
        });
    }
});
