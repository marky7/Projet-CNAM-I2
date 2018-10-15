echo "
# ________________________________________________ #
# ___ Démarrer le serveur de messages RabbitMQ ___ #
# ________________________________________________ #
"
docker start package-traceability-rabbit


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




