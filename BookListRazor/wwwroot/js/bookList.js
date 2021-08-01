﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
})

function loadDataTable() {
    dataTable = $('#DT_load').dataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            { "data": "id", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/BookList/Edit?id=${data}" class="btn btn-success text-white " style='cursor:pointer; width:70px;'>
                                Edit
                                </a>
                                &nbsp;
                                <a onclick=Delete('/api/book?id='+${data}) class="btn btn-danger text-white " style='cursor:pointer; width:70px;'>
                                Delete
                                </a>
                            </div>`;
                }, "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    })
}

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success == null) {
                        toastr.error(data.message);
                    }
                    else {
                        toastr.success(data.message);
                    }
                    dataTable.ajax.reload();
                }
            });
        }
    });
}