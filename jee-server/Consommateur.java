import com.rabbitmq.client.*;

import java.io.IOException;
import java.util.ArrayList;

    public class GeneBean {

      private final static String QUEUE_NAME = "FileDesMessages";

      public static void main(String[] argv) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        // Adresse IP
        factory.setHost("localhost");
        // Création de la connexion
        Connection connection = factory.newConnection();
        // Création d'un canal dans la connexion AMQP
        Channel channel = connection.createChannel();
        // Déclaration de la queue ( qui existe déjà car créée par le producteur )
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

        Consumer consumer = new DefaultConsumer(channel) {
          @Override
          public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body)
              throws IOException {
            // on récupère la chaine de byte et on la transforme en string
            String mesures = new String(body, "UTF-8");
            // La chaine de caractère récupérée, on la sysout pour les tests
            System.out.println(" [x] Received '" + mesures + "'");
            // On la décompose maintenant pour récupérer ce qui nous intéresse
            String[] decomposition = mesures.split(";");
            // La première donnée est toujours l'ID du colis
            Integer id = Integer.parseInt(decomposition[0]);
            // Liste qui va stocker les mesures récupérées
            ArrayList<String> listeMesures = new ArrayList<String>();
            // Récupération des données
            while(int a=1;a<decomposition.length-1;a++) {
                listeMesures.add(decomposition[a]);
            }
            String aideALaDecomposition;
            // Décomposition de ces données
            while(int b=0;b<listeMesures.size();b++) {
                aideALaDecompositionlisteMesures.get(b).split(":");
            }
          }
        };
        // Démarre le consommateur déclaré au dessus ( ne pas toucher, nécessite de bien comprendre RabbitMQ. EN GROS, CA EXECUTE CE QUE VOUS AVEZ DECLARE
        channel.basicConsume(QUEUE_NAME, true, consumer);
      }
    }
