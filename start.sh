echo "
# ________________________________________________ #
# ___ Démarrer le serveur de messages RabbitMQ ___ #
# ________________________________________________ #
"
docker start package-traceability-rabbit


echo "
# _____________________________________________________________ #
# ___ Démarrer l'acquisition de données des entrepots fixes ___ #
# _____________________________________________________________ #
"
cd ~/Dev/Package_Traceability/arduino-nano/nodejs_connect_amqp
npm start &


echo "
# ____________________________ #
# ___ Démarrer Fabric v1.1 ___ #
# ____________________________ #
"
cd ~/fabric-dev-servers/fabric-scripts/hlfv1/composer
docker-compose start 
sleep 3


echo "
# _________________________________________________________________ #
# ___ Démarrer le serveur REST Composer v0.19  (localhost:3000) ___ #
# _________________________________________________________________ #
"
composer-rest-server -c admin@package-traceability-network -n never -w true &
sleep 3


echo "
# _____________________________________________________ #
# ___ Démarrer composer-playground (localhost:8080) ___ #
# _____________________________________________________ #
"
composer-playground &
sleep 3


echo "
# _________________________________________________________________ #
# ___ Démarrer l'application Front-End Angular (localhost:4200) ___ #
# _________________________________________________________________ #
"
cd ~/Dev/Package_Traceability/angular-app 
npm start 
sleep 3

echo "
# _____________________________ #
# ___ Démarrer Serveur Java ___ #
# _____________________________ #
"

cd ~/Dev/Package_Traceability/java-server
java -jar main-server.jar &


# Wait for all process are running before displaying final message

while ! nc -z localhost 3000; do
  sleep 0.1
done

while ! nc -z localhost 4200; do
  sleep 0.1
done

while ! nc -z localhost 8080; do
  sleep 0.1
done



echo "                                                                                                                                                      



                                                                                                                                                                     
██████╗  █████╗  ██████╗██╗  ██╗ █████╗  ██████╗ ███████╗
██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔══██╗██╔════╝ ██╔════╝
██████╔╝███████║██║     █████╔╝ ███████║██║  ███╗█████╗  
██╔═══╝ ██╔══██║██║     ██╔═██╗ ██╔══██║██║   ██║██╔══╝  
██║     ██║  ██║╚██████╗██║  ██╗██║  ██║╚██████╔╝███████╗
╚═╝     ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝

████████╗██████╗  █████╗  ██████╗███████╗ █████╗ ██████╗ ██╗██╗     ██╗████████╗██╗   ██╗
╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗██║██║     ██║╚══██╔══╝╚██╗ ██╔╝
   ██║   ██████╔╝███████║██║     █████╗  ███████║██████╔╝██║██║     ██║   ██║    ╚████╔╝ 
   ██║   ██╔══██╗██╔══██║██║     ██╔══╝  ██╔══██║██╔══██╗██║██║     ██║   ██║     ╚██╔╝  
   ██║   ██║  ██║██║  ██║╚██████╗███████╗██║  ██║██████╔╝██║███████╗██║   ██║      ██║   
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝╚══════╝╚═╝   ╚═╝      ╚═╝   

                                                                                         
                                                                                                                                                      
# ----------------------------------------------------- #
# -         PACKAGE TRACEABILITY IS STARTED           - #
# ----------------------------------------------------- #
# - Composer Playground is listening on localhost:8080  #
# - Serveur REST is listening on localhost:4200         #
# - Application is listening on localhost:3000          #
# ----------------------------------------------------- #

"

