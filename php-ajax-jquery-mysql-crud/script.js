
    $(document).ready(function() {
        $.getJSON('http://localhost/php/php-ajax-jquery-mysql-crud/read.php', function(json) {
            var tr=[];
            for (var i = 0; i < json.length; i++) {
                tr.push('<tr>');
                tr.push('<td>' + json[i].id + '</td>');
                tr.push('<td>' + json[i].name + '</td>');
                tr.push('<td><button class=\'edit\'>Edit</button>&nbsp;&nbsp;<button class=\'delete\' id=' + json[i].id + '>Delete</button></td>');
                tr.push('</tr>');
            }
            $('table').append($(tr.join('')));
        });
        
        $(document).delegate('#addNew', 'click', function(event) {
            event.preventDefault();
            
            var name = $('#name').val();
            
            if(name == null || name == "") {
                alert("Company Name is required");
                return;
            }
            
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "http://localhost/php/php-ajax-jquery-mysql-crud/create.php",
                data: JSON.stringify({'name': name}),
                cache: false,
                success: function(result) {
                    alert('Company added successfully');
                    location.reload(true);
                },
                error: function(err) {
                    alert(err);
                }
            });
        });
        
        $(document).delegate('.delete', 'click', function() { 
            if (confirm('Do you really want to delete record?')) {
                var id = $(this).attr('id');
                var parent = $(this).parent().parent();
                $.ajax({
                    type: "DELETE",
                    url: "http://localhost/php/php-ajax-jquery-mysql-crud/delete.php?id=" + id,
                    cache: false,
                    success: function() {
                        parent.fadeOut('slow', function() {
                            $(this).remove();
                        });
                        location.reload(true)
                    },
                    error: function() {
                        alert('Error deleting record');
                    }
                });
            }
        });
        
        $(document).delegate('.edit', 'click', function() {
            var parent = $(this).parent().parent();
            
            var id = parent.children("td:nth-child(1)");
            var name = parent.children("td:nth-child(2)");
            var buttons = parent.children("td:nth-child(3)");
            
            name.html("<input type='text' id='txtName' value='" + name.html() + "'/>");
            buttons.html("<button id='save'>Save</button>&nbsp;&nbsp;<button class='delete' id='" + id.html() + "'>Delete</button>");
        });
        
        $(document).delegate('#save', 'click', function() {
            var parent = $(this).parent().parent();
            
            var id = parent.children("td:nth-child(1)");
            var name = parent.children("td:nth-child(2)");
            var buttons = parent.children("td:nth-child(3)");
            
            $.ajax({
                type: "PUT",
                contentType: "application/json; charset=utf-8",
                url: "http://localhost/php/php-ajax-jquery-mysql-crud/update.php",
                data: JSON.stringify({'id' : id.html(), 'name' : name.children("input[type=text]").val()}),
                cache: false,
                success: function() {
                    name.html(name.children("input[type=text]").val());
                    buttons.html("<button class='edit' id='" + id.html() + "'>Edit</button>&nbsp;&nbsp;<button class='delete' id='" + id.html() + "'>Delete</button>");
                },
                error: function() {
                    alert('Error updating record');
                }
            });
        });

    });
