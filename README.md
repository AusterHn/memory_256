# **Implémentation des fonctionnalités d'écriture et de reset dans une mémoire de 256 octets**
La mémoire est représenté sous la forme d'un élément HTML Canvas. La plage d'adresses disponible est de 0x00 à 0xFF (256 octets)
## Utilisation:
    - Renseignez  le champ "Position dans la mémoire": le nombre renseigné appartient à l'intervalle [1, 256]
    - Renseignez le champ "Données (en décimale)": le nombre renseigné appartient à l'intervale [0, 255]
    - Renseignez le champ "Instruction de controle", ce champ ne peut que prendre deux valeurs:
        - 0 qui correspond à l'opération d'écriture en mémoire
        - 1 qui correspond à l'opération de reset de la mémoire
    - Cliquez sur le bouton "Go"
        - Dans le cas d'une écriture dans la mémoire, 
            - le buffer d'adresses va contenir (en hexadécimale) la valeur de la position renseignée - 1 (puisque les adresses commence à l'adresse 0 dans la mémoire),
            - le buffer de données va contenir (en hexadécimale) la valeur de la donnée renseignée
            - le buffer de controle va contenir la valeur 0,
        -Dans le cas d'un reset mémoire,
            - renseignez quand même les champs de position et de donnée,
            - mettre la valeur 1 dans le champ "Instruction de contrôle",
            - La mémoire ainsi que les buffers seront automatique remis à leur état initial.
