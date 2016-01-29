 $(document).ready(function() {
     var aCall = $.ajax({
         type: "GET",
         url: 'json/content.json',
         contentType: "image/png",
         dataType: 'JSON'
     });
     aCall.success(function(data) {
         var Data = data;
         $('#image1').attr('src', Data.Images[0]);
         $('#image2').attr('src', Data.Images[1]);
         $('#image3').attr('src', Data.Images[2]);

         for (var i = 0; i < Data.item.length; i++) {
             $('.idata').eq(i).html(Data.item[i].idata);
             $('.iheading').eq(i).html(Data.item[i].ititle);
             $('.itemholder .ilogo').eq(i).attr('src', Data.item[i].iimage);
         }
     });
     /*tabs in main page*/
     $('.tab2').click(function() {
         $('#appear').hide();
     });

     $('.tab1').click(function() {
         $('#appear').show();
     });
 });
 /*creating employee*/
 $('#createemp').click(function() {
     $('#updatebtn').hide();
     $('#savebtn').show();
 });

 $('#savebtn').click(function() {
     var Sno = $(sno).val();
     var Name = $(empname).val();
     var Address = $(empaddress).val();
     var Id = $(empid).val();
     $('.empTable tbody').append('<tr><td>' + Sno + '</td><td>' + Name + '</td><td>' + Address + '</td><td>' + Id + '</td><td><button type="button" id="tableEdit" >Edit</button></td><td><button type="button" id="tableview" >View</button></td><td><button type="button"  value="Delete" id="tabledelete">Delete</button></td><td><span class="glyphicon glyphicon-info-sign" id="empinfo"></span></td>');
 });
 /*Editing the table*/
 var cell1, cell2, cell3, cell4;
 $(document).on("click", "#tableEdit", function() {
     $('#tableModal').modal('show');
     $('#updatebtn').show();
     $('#savebtn').hide();

     var tr = $(this).closest('td').parent();
     cell1 = tr.find('td').eq(0);
     cell2 = tr.find('td').eq(1);
     cell3 = tr.find('td').eq(2);
     cell4 = tr.find('td').eq(3);
     $('#sno').val(cell1.text());
     $('#empname').val(cell2.text());
     $('#empaddress').val(cell3.text());
     $('#empid').val(cell4.text());
 });

 /*updating table*/
 $('#updatebtn').click(function() {
     cell1.text($('#sno').val());
     cell2.text($('#empname').val());
     cell3.text($('#empaddress').val());
     cell4.text($('#empid').val());
     $('#tableModal').modal('hide');
 });
 /*close of update*/
 /*table content view*/
 $(document).on("click", "#tableview", function() {
     var tr = $(this).closest('td').parent();
     $('#content').html(tr.find('td').eq(1).text());
     $('#viewModal').modal('show');
 });
 /*delete*/
 $(document).on("click", "#tabledelete", function() {
     var tr = $(this).closest('td').parent().remove();
 });
 /*view in panel*/
 $('[id^=viewDetails]').click(function() {
     $('#contentID').html($(this).closest('.content').find('p').text());
     $('#myDetails').modal('show');
 });
 
 $(document).on("mouseover", "#empinfo", function() {
     var tr = $(this).closest('td').parent();
     $(this).tooltip({
         title: tr.find('td').eq(1).text()
     });
 });
 /*sorting the table*/
 var f_sl = 1;
 $('#sorttable').click(function() {
     $('#sorttable span').toggleClass('glyphicon-triangle-bottom glyphicon-triangle-top');
     f_sl *= -1;
     var n = $(this).prevAll().length;
     sortTable(f_sl, n);
 });
 function sortTable(f, n) {
     var rows = $('#empTable tbody  tr').get();
     rows.sort(function(a, b) {
         var A = Number($(a).children('td').eq(n).text());
         var B = Number($(b).children('td').eq(n).text());
         if (A < B) {
             return -1 * f;
         }
         if (A > B) {
             return 1 * f;
         }
         return 0;
     });
     $.each(rows, function(index, row) {
         $('#empTable').children('tbody').append(row);
     });
 }
