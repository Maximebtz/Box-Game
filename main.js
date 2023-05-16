    
    
    function shuffleChildren(parent){
        children = parent.children
        let i = children.length, k, temp
        // On boucle tant que 1 oté de i est toujours poitif
        while (--i > 0) { 
            // k stocke un nombre aléatoire basé sur i
            k = Math.floor(Math.random() * (i+1))
            // temp pointe l'élément à la position k dans board
            temp = children[k]
            // Remplace l'élément à la position k par l'élément à la position i
            children[k] = children[i]
            // Place l'élément k pointé temporairement à la fin du contenu de board
            parent.appendChild(temp)
        }
    }

    // type (une chaine de caractères) correspondant au type de réaction souhaité
    // clickedBox (HTMLElement) étant la boite sur laquelle l'effet sera appliqué
    function showReaction(type, clickedBox){
        clickedBox.classList.add(type)
        if(type !== "success"){
            setTimeout(function(){
                clickedBox.classList.remove(type)
            }, 800)
        }
    }

    // Création d'une div dans le HTML avec createElement  
    const box = document.createElement("div")
    // Lui donner -> class="box"
    box.classList.add("box")

    // Récupérer l'ID de la div existante
    const board = document.querySelector('#board')
    
    let nb = 1

    // Faire une boucle avec une valeur définie pour un nombre de boites précis (création variable let = i; ajouter le mbr de boites i <= 10; parcourir en additionnant i++;)
    for(let i = 1; i <= 10; i++){
        // Créer une nouvelle variable let newbox qui aura pour valeur non pas l'élément box mais une copie, un clone de celui-ci grâce à la méthode cloneNode().
        const newbox = box.cloneNode()
        // Inclure en texte le chiffre associé à la boite
        newbox.innerText = i
        // Mettre l'élément du DOM à la fin de l'élément visé, le méthode prepend() l'aurait mis au début 
        board.appendChild(newbox)
        
        // Ajout d'un évenement 'click'
        newbox.addEventListener('click', function() {
            // Affichage dans la console
            console.log("Boite n°" + i + ", click !")

            // Déterminer si la case cliquée comporte le numéro attendu
            if(i == nb){
                // Ajout d'une classe : class="box-valide"
                newbox.classList.add("box-valid")
                // 1
                if(nb == board.children.length){
                    showReaction("success", box)

                }
                nb++
            }
            // 2
            else if (i > nb){
                showReaction("error", newbox)

                nb = 1
                // Recupérer un tableau d'élément et faire un foreach pour passer chaque éléments 
                board.querySelectorAll(".box-valid").forEach(function(validBox){
                    validBox.classList.remove("box-valid")
                })
            }
            // 3
            else{
                showReaction("notice", newbox)
            }
        })
    }


    shuffleChildren(board)