echo "
# _____________________________________________________________ #
# ___ Arréter l'acquisition de données des entrepots fixes ___ #
# _____________________________________________________________ #
"
cd ~/Dev/Package_Traceability/arduino-nano/nodejs_connect_amqp
kill $(ps aux | grep nodejs_connect_amqp | awk '{print $2}')
wait

echo "Les appareils d'acquisition de données des entrepots fixes peuvent maintenant être déconnectés du réseau."


echo "
# ___________________________ #
# ___ Arréter Fabric v1.1 ___ #
# ___________________________ #
"
cd /home/ptracea/fabric-dev-servers/fabric-scripts/hlfv1/composer
docker-compose stop 
wait 


echo "
# ___________________________________________ #
# ____ Arréter le réseau Composer v0.0.2 ____ #
# ___________________________________________ #
"
composer network stop --networkName tutorial-network --networkVersion 0.0.2 --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --file networkadmin.card
wait


echo "
# _________________________________________________________________ #
# ___ Arréter le serveur REST Composer v0.19  (localhost:3000) ___ #
# _________________________________________________________________ #
"

fuser -k 3000/tcp
wait


echo "
# _________________________________________________________________ #
# ___ Arréter l'application Front-End Angular (localhost:4200) ___ #
# _________________________________________________________________ #
"
fuser -k 4200/tcp
wait


echo "
# _____________________________________________________ #
# ___ Arréter composer-playground (localhost:8080) ___ #
# _____________________________________________________ #
"
fuser -k 8080/tcp
wait


echo "
# _________________________ #
# ___ Arréter RabbitMQ ___ #
# _________________________ #
"
docker stop package-traceability-rabbit
wait

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
# -         PACKAGE TRACEABILITY IS STOPPED           - #
# ----------------------------------------------------- #

"


