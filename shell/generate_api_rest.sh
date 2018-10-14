# Mettre à jour l'API REST avec le nouveau modèle de données
# ATTENTION : Le script start ne doit pas avoir été lancé
# ./../stop.sh

# Démarrer Fabric
cd ~/fabric-dev-servers/fabric-scripts/hlfv1/composer
docker-compose start

# Générer la nouvelle API à partir du fichier CTO
composer-rest-server -c admin@package-traceability-network -n never -w true

