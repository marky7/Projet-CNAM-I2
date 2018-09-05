# package-traceability-network

package-traceability-network


Lors du lancement de l'interface sur localhost:8080 :

Il y a deux onglets. Define & test. Rester sur define
Il y a plusieurs fichiers dans la liste a gauche. 

=> Supprimer tous les fichiers (clic sur un fichier puis corbeille en haut à droite de l'éditeur de code) SAUF celui nommé permission.acl

=> Grâce au bouton add en bas, importer 
- Dans un premier temps, le modèle modele-de-donnees.cto (dossier Models) puis valider
- Ensuite, le fichier createAsset.js du dossier lib

=> Cliquer sur deploy changes (accepter la dernière pop-up qui demande sur quel peer deployer)

C'est bon, vous pouvez utiliser l'api générée par le serveur REST sur le port 3000

