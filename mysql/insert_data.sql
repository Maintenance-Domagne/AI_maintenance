INSERT INTO pannes (machine, category, description, keywords, solutions, priority)
VALUES
('imprimante', 'Matériel', 'Le papier est coincé dans le bac ou le chemin d\'impression', 'papier bloqué,bourrage,coincé', 'Ouvrez le bac et retirez le papier coincé|Vérifiez que le papier est correctement chargé|Nettoyez les rouleaux si nécessaire', 3),
('pc', 'Matériel', 'Le PC démarre mais l\'écran reste noir', 'écran noir,no display,black screen', 'Vérifiez que le moniteur est bien connecté|Testez avec un autre câble ou écran|Redémarrez le PC en mode sans échec', 3),
('serveur', 'Logiciel', 'Le serveur renvoie une erreur interne 500', 'erreur 500,internal server error,http 500', 'Vérifiez les logs du serveur pour identifier l\'erreur|Assurez-vous que les fichiers de configuration sont corrects|Redémarrez le serveur si nécessaire', 3);
