const problemInput = document.getElementById("problemInput");
const suggestionsDiv = document.getElementById("suggestions");
let history = [];
const suggestionKeywords = ["papier bloqué","impression floue","bouton ne fonctionne pas","écran noir","connexion lente","erreur 500","bavure","coincé","power","click","slow","lag"];

// Suggestions dynamiques
problemInput.addEventListener("input", function(){
    const text = problemInput.value.toLowerCase();
    suggestionsDiv.innerHTML = "";
    if(!text){ suggestionsDiv.style.display="none"; return; }

    const matches = suggestionKeywords.filter(k=>k.includes(text));
    if(matches.length>0){
        matches.forEach(m=>{
            const div = document.createElement("div");
            div.textContent = m;
            div.addEventListener("click",()=>{ problemInput.value=m; suggestionsDiv.style.display="none"; });
            suggestionsDiv.appendChild(div);
        });
        suggestionsDiv.style.display="block";
    }else suggestionsDiv.style.display="none";
});

// Fonction pour appeler PHP
function getSolutions(){
    const machine = document.getElementById("machineSelect").value;
    const problemText = problemInput.value.trim();
    const solutionDiv = document.getElementById("solution");
    const solutionList = document.getElementById("solutionList");
    const historyDiv = document.getElementById("historyDiv");
    const historyList = document.getElementById("historyList");

    solutionList.innerHTML="";

    if(!machine){ solutionList.innerHTML="<li>Veuillez sélectionner une machine.</li>"; solutionDiv.style.display="block"; return; }
    if(!problemText){ solutionList.innerHTML="<li>Veuillez décrire votre problème.</li>"; solutionDiv.style.display="block"; return; }

    fetch(`api/get_solutions.php?machine=${encodeURIComponent(machine)}&problem=${encodeURIComponent(problemText)}`)
        .then(response=>response.json())
        .then(data=>{
            if(data.length===0){
                solutionList.innerHTML="<li>Aucune solution trouvée.</li>";
            } else {
                data.forEach(item=>{
                    const categoryLi = document.createElement("li");
                    categoryLi.textContent = item.category;
                    categoryLi.className="solution-category";
                    solutionList.appendChild(categoryLi);

                    item.solutions.forEach(sol=>{
                        const li = document.createElement("li");
                        li.textContent = sol;
                        li.className = item.score >= 2 ? "solution-item high-priority" : "solution-item medium-priority";
                        solutionList.appendChild(li);
                    });
                });
            }
            solutionDiv.style.display="block";

            // Historique
            history.unshift({machine: machine, problem: problemText});
            historyList.innerHTML="";
            history.forEach(item=>{
                const li = document.createElement("li");
                li.textContent=`[${item.machine}] ${item.problem}`;
                historyList.appendChild(li);
            });
            historyDiv.style.display="block";
        })
        .catch(err=>{
            solutionList.innerHTML="<li>Erreur serveur : " + err + "</li>";
            solutionDiv.style.display="block";
        });
}
