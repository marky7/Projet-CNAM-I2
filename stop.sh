echo "
# ___________________________ #
# ___ Stopper Fabric v1.1 ___ #
# ___________________________ #
"
cd /home/ptracea/fabric-dev-servers/fabric-scripts/hlfv1/composer
docker-compose stop 


echo "
# __________________________________________ #
# ___ Démarrer le réseau Composer v0.0.2 ___ #
# __________________________________________ #
"
composer network stop --networkName tutorial-network --networkVersion 0.0.2 --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --file networkadmin.card


echo "
# _________________________________________________________________ #
# ___ Arréter le serveur REST Composer v0.19  (localhost:3000) ___ #
# _________________________________________________________________ #
"

fuser -k 3000/tcp
composer-rest-server -c admin@tutorial-network -n never -w true &


echo "
# _________________________________________________________________ #
# ___ Arréter l'application Front-End Angular (localhost:4200) ___ #
# _________________________________________________________________ #
"
fuser -k 4200/tcp


echo "
# _____________________________________________________ #
# ___ Arréter composer-playground (localhost:8080) ___ #
# _____________________________________________________ #
"
fuser -k 8080/tcp


echo "
# _________________________ #
# ___ Arréter RabbitMQ ___ #
# _________________________ #
"
docker stop package-traceability-rabbit


