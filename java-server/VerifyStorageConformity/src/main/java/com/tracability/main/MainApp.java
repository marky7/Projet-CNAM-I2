package com.tracability.main;

import java.io.IOException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.drools.template.ObjectDataCompiler;
import org.kie.api.KieServices;
import org.kie.api.builder.KieFileSystem;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.StatelessKieSession;
import org.json.JSONArray;
import org.json.JSONObject;

import com.rabbitmq.client.*;
import com.tracability.event.DangeresousConditionGasEvent;
import com.tracability.event.Event;
import com.tracability.event.TemperatureEvent;
import com.tracability.model.*;
import com.tracability.model.Package;
import com.tracability.rule.Condition;
import com.tracability.rule.Rule;
public class MainApp {

	// Nom du pipe utilisé sur RABBIT MQ pour la transaction du message
	private final static String QUEUE_NAME = "FileDesMessages";
	private static Measures currentMeasure;
	private static AlertDecision alertDecion;
	public static void main(String[] args) throws Exception {
		/*Toutes les minutes on éxécute le code ci-dessous*/
		do {
	/*********************************************************************************ALEXIS********************************************************************/

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
			// Cast de la chaine de caractère reçue en format JSON
			JSONObject jsonObj = new JSONObject(mesures);
			//* ICI : TRANSFORMEZ L'Object JSON suivant :
			//{"creationDate":"2018-09-05T21:03:10.494Z","storageArea":"","measures":[{"type":"gaz","name":"CO2","value":"1","unit":"%",
			//"creationDate":"2018-09-05T21:03:10.494Z"},{"type":"gaz","name":"O2","value":"25",
			//"unit":"%","creationDate":"2018-09-05T21:03:10.494Z"},{"type":"temperatureHumidity"
			//,"creationDate":"2018-09-05T21:03:10.494Z","temperature":25,"temperatureUnit":"°C","humidity":30,"humidityUnit":"%"}],"tags":[
			//{"valeur":"adresse_mac_detectee_1","creationDate":"2018-09-05T21:03:10.494Z"},{"valeur":"adresse_mac_detectee_2","creationDate":"2018-09-05T21:03:10.494Z"},
			//{"valeur":"adresse_mac_detectee_3","creationDate":"2018-09-05T21:03:10.494Z"}]}
			// EN OBJET JAVA POUR QUE NASSIM PUISSE MANIPULER AINSI LES DONNEES
          }
        };
        // Démarre le consommateur déclaré au dessus ( ne pas toucher, nécessite de bien comprendre RabbitMQ. EN GROS, CA EXECUTE CE QUE VOUS AVEZ DECLARE
        channel.basicConsume(QUEUE_NAME, true, consumer);
/*********************************************************************************ALEXIS******************************************************************* */

			/*1. Récupérer les données du serveur AMQP
			 *  Format donnée
			 *	{
			 *   "Measures": {
			 *       "temperature": "temperatureValue",
			 *		 "humidity": "humidityValue",
			 *		 "gas": {
			 *				 gasName : gasNameValue
			 *				  .
			 *				  .
			 *				  .	
			 *				}
             *		}
             *	 "PositionGPS": {
			 *       "longitude": "longitudeValue",
			 *		 "latitude": "latitudeValue",
             *		}
             *	 "TagList": {
			 *       "d54z8","a89sz8","a89sz8"....
             *		}
             *   "AcquisitionDateTime": {
			 *       "2018/02/15 18:00:35"
             *		}
        	 *	}
   			 *
			 * 
			 * */
			/*JSONObject currentDatas = new JSONObject(
					  "{\"Measures\":{\"temperature\":\"5.2\",\"humidity\": \"3.5\"}}"
					);
			JSONArray datas = currentDatas.getJSONArray("datas");
			System.out.println(datas.toString());
			/*if(datas != null) {
			    for(int i = 0 ; i <datas.length() ; i++) {
			        birthdays[i] = datas.getString("birthday");
			    }
			}*/
			/*2. Définir une classe statique de meusure
			 * */
			
			Date currentMeasureDate = new Date();
			double currentMeasureHumityValue = 5.0;
			double currentMeasureTemperatureValue = 6.0;
			HashMap< String,Double> currentMeasureGasValues = new HashMap<String,Double>();
			currentMeasureGasValues.put("N2", 123.5);
			currentMeasureGasValues.put("O2", 96.2);
			currentMeasureGasValues.put("CO2", 134.6);
			currentMeasure = new Measures(currentMeasureDate,currentMeasureTemperatureValue, currentMeasureHumityValue,currentMeasureGasValues);
			//System.out.println(currentMeasure.toString());
			/*3. Définir une liste de "Package"
			 *  Pour chaque identifiant de la liste de tag
			 *  	Créer un "Paquage"
			 *  	Ajouter ce paquage à la liste 
			 *  Fin de boucle  
			 * */
			List<String> presentTags = new ArrayList<String>();
			presentTags.add("d540r");
			presentTags.add("98440");
			presentTags.add("8sd85");
			int nbTags = presentTags.size();
			
			/*Package présent*/
			List<Package> presentPackages = new ArrayList<Package>();
			
			int i=0;
			while(i<nbTags) {
				String tagnumber = presentTags.get(i);
				Package pack = getPackageFromTag(tagnumber);
				presentPackages.add(pack);
				i++;
			}
			
			 /*4.
			  *  Pour chaque Package
			  *  	3.1 Récupérer la liste de produits contenu dans le pakage
			  *  	3.2 Pour chaque produit 
			  *  		3.2.1 Récupérer le profil correspondant
			  *  		3.2.2 Récupérer les conditions de stockage pour le profil
			  *  		3.2.3 Créer une régle (Format drools ) pour le profil
			  *  		3.2.4 Apply rules template 
			  *         3.2.5 Envoyer le produit au moteur de regle (Retourne un objet DecisionAlert)
			  *         3.2.6 Si Condition non respécté 
			  *         	3.2.6.1 //Traitement (Mail, SMS, Enregistrement en base )     
			  *          
			  * 
			  * */
			int nbpacks = presentPackages.size();
			int j=0;
			while(j<nbpacks) {
				Package pack =presentPackages.get(j);
				List<Product> products = pack.getProducts();
				int nbproducts = products.size();
			
				int k = 0;
				while(k<nbproducts) {
					Product product = products.get(k);
					//System.out.println(product.toString());
					//Vérifier que les régles de transport sont réspectées
					ProductProfile profil_product = product.getProductProfil();
					List<Rule> regle = profil_product.getRules();
					int nb_regle_profil = regle.size();
					int z;
					for(z=0;z<nb_regle_profil;z++) {
						String drl = applyRuleTemplate(currentMeasure, regle.get(z));
						AlertDecision alertDecision = evaluate(drl, currentMeasure);
						// doAlert is false by default
						System.out.println(alertDecision.getDoAlert());
				        if (alertDecision.getDoAlert()) {
				        	//notification
				        	
				        }
					}
					
					k++;
				}
				j++;
			}
			  /*attente*/
			  try {
					TimeUnit.MINUTES.sleep(1);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}while(1==1);
	}

	private static Package getPackageFromTag(String tagnumber) throws Exception {
		/*Requete BDD get infos package from tag 
		 * style :
		 * 
		 * Select  Id, description, Provider, customer, deleliveryDate, creationDate
		 * from Packages, Missions
		 * Where tag=tagnumber 
		 * AND Packages.id = Missions.packagesId
		 * 
		 * */
		/*Requete get Provider from Package id*/
		Provider provider = Provider.getProviderFromId("896");
		Customer customer = Customer.getCustomerFromID("210");
		Date deleveryDate = new Date();
		Date creationDate = new Date();
		Tag tag = new Tag();
		List<Product> products = Product.getProductFromPackageId("569");

		/*Récupérer les produits avec l'idenfiant */
		/*Evenement à tester */
		//TemperatureEvent event = new TemperatureEvent();
		//event.setTemperature(currentMeasure.getTemperatureValue());
		
		List<Attachment> attachments = new ArrayList<Attachment>();
		
		Package pack = new Package(0, "Test Package",provider, customer, products,deleveryDate,  attachments , tag, creationDate);
		return pack;
	}
	
	
	static private AlertDecision evaluate(String drl, Measures measures) throws Exception {
        KieServices kieServices = KieServices.Factory.get();
        KieFileSystem kieFileSystem = kieServices.newKieFileSystem();
        kieFileSystem.write("src/main/resources/rule.drl", drl);
        kieServices.newKieBuilder(kieFileSystem).buildAll();

        KieContainer kieContainer = kieServices.newKieContainer(kieServices.getRepository().getDefaultReleaseId());
        StatelessKieSession statelessKieSession = kieContainer.getKieBase().newStatelessKieSession();

        AlertDecision alertDecision = new AlertDecision();
        statelessKieSession.getGlobals().set("alertDecision", alertDecision);
        statelessKieSession.execute(measures);
        return alertDecision;
    }
	
	/*Génération des règles*/
	static private String applyRuleTemplate(Measures measures, Rule rule) throws Exception {
        Map<String, Object> data = new HashMap<String, Object>();
        ObjectDataCompiler objectDataCompiler = new ObjectDataCompiler();

        data.put("rule", rule);
        data.put("measure", measures.getClass().getName());
        return objectDataCompiler.compile(Arrays.asList(data), Thread.currentThread().getContextClassLoader().getResourceAsStream("rule-template.drl"));
    }
	
}
