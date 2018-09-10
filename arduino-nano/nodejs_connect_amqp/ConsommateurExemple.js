var queue = 'fileDesMessages';
console.log('---------------------------------------------------DEBUT-------------------------------------------------------');
function refreshData()
{
    x = 2;  // 5 Seconds
    console.log('Lecture automatique du canal, en attente de réception...');
    // Do your thing here

function bail(err) {
  console.error(err);
  process.exit(1);
}



// Consumer
function consumer(conn) {
  var ok = conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(queue);
    ch.consume(queue, function(msg) {
      if (msg !== null) {
        console.log('Un message a été reçu !!!!!!!!!!!!!!!!   >>>           '+msg.content.toString());
        ch.ack(msg);
      }
    });
  }
}

require('amqplib/callback_api')
  .connect('amqp://localhost', function(err, conn) {
    if (err != null) bail(err);
    consumer(conn);
  });

  setTimeout(refreshData, x*1000);
}


refreshData(); // execute function