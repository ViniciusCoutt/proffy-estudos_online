// Procurar o botão
document.querySelector("#add-time")
// Quando clicar no botão 
.addEventListener("click", cloneField)
// Executar uma acao
function cloneField(){
    // $ sempre por as aspas, mesmo sem conteudo
    
    //Duplicar os campos (mostrar quais campos)
    const NewFieldContainer = document.querySelector('.schedule-item').cloneNode(true) //Dado boolean: true or false
    // $ Ao colocar "const" garantimos que essa função do Newfield não seja trocado ao decorrer do código

    // Pegar os campos (mostrar quais campos)
    const fields = NewFieldContainer.querySelectorAll('input') //Vai pegar tudo que for tag input e colocar no fields

    //para cada campo, limpar
    fields.forEach(function(field) {
        // Pegar o field do momento e limpa ele
        field.value = "" 

    })
    
    // Mostrar qual local da página colocar
    document.querySelector('#schedule-items').appendChild(NewFieldContainer) //appendChild, é uma funcionalidade de adicionar um filho, que iremos dizer qual entre as aspas
}
