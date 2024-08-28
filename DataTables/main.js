//Todos scripts dentro de Document.Ready são Jquery
$(document).ready(function() {

    $('#consultar_usuarios').dataTable({
        "bJQueryUI": true,
        "sPaginationType": "full_numbers",
        "sDom": '<"H"Tlfr>t<"F"ip>',
        "oTableTools": {
            "sSwfPath": "../../js/DataTables-1.9.4/extras/TableTools/media/swf/copy_csv_xls_pdf.swf",
            "aButtons": [
                {
                    "sExtends": "xls",
                    "sButtonText": "Exportar para Excel",
                    "sTitle": "Usuarios",
                    "mColumns": [0, 1, 2, 3]
                },
                {
                    "sExtends": "pdf",
                    "sButtonText": "Exportar para PDF",
                    "sTitle": "Usuarios", "sPdfOrientation": "landscape",
                    "mColumns": [0, 1, 2, 3]
                }
            ]
        },
        "oLanguage": {
            "sLengthMenu": "Mostrar _MENU_ registros por página",
            "sZeroRecords": "Nenhum registro encontrado",
            "sInfo": "Mostrando _START_ / _END_ de _TOTAL_ registro(s)",
            "sInfoEmpty": "Mostrando 0 / 0 de 0 registros",
            "sInfoFiltered": "(filtrado de _MAX_ registros)",
            "sSearch": "Pesquisar: ",
            "oPaginate": {
                "sFirst": "Início",
                "sPrevious": "Anterior",
                "sNext": "Próximo",
                "sLast": "Último"
            }
        },
        "aaSorting": [[0, 'desc']],
        "aoColumnDefs": [
            {"sType": "num-html", "aTargets": [0]}

        ]
    });
});//fim jquery