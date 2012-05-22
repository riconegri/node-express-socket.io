$( function () {
   var socket = new io.connect( 'http://203.0.113.0:' +port);

    $( '#form1' ).submit( function () {
     msg = $( '#message' ).val();
     msg = sanitize(msg);
     socket.emit( 'msg send' , msg);
     $( '#message' ).val( '' );
       return false ;
     } );
     
     socket.on( 'msg push' , function (msg, date ) {
       $( 'ul' ).prepend( '<li>' +msg+ ' (' + date + ')</li>' );
     } );
 } );

 function sanitize(str) {
   str = str.replace( /</g , '&lt;' )
     .replace( />/g , '&gt;' )
     .replace( /"/g , '&quot;' )
     .replace( /'/g , '&#39;' );
   return str;
 }