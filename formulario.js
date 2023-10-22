function pegaDados() {

    const formData = new FormData(document.getElementById("form"));
    const obj = Object.fromEntries(formData)

    const transformation = Object.entries(obj).map(([key, value]) => ({ index: key === "tamanhoTabua" || key === "limiteCorte" ? -1 : parseInt(key.slice(7)), [key === "tamanhoTabua" ? "tamanhoTabua" : key === "limiteCorte" ? "limiteCorte" : key.slice(0, 7)]: value }));

    console.log(transformation)

    const listaTamanho = []
    const listaQuantidade = []
    var tamanhoTabua = 0
    var limiteCorte = 0
    var valorUsuario = 0


    transformation.forEach(x => {
        if (x.index === -1 && x.limiteCorte !== undefined) {
            limiteCorte = x.limiteCorte
        }
        if (x.index === -1 && x.tamanhoTabua !== undefined) {
            tamanhoTabua = x.tamanhoTabua
        }

        if (x.tamanho !== undefined) {
            listaTamanho.push(x.tamanho)
        }
        if (x.quantid !== undefined) {
            listaQuantidade.push(x.quantid)
        }
    })

    transformation.forEach(x => {
        console.log(x.index)

    })

    const listaFinal = []

    listaTamanho.forEach((tamanho, index) => {
        for (var i = 0; parseInt(listaQuantidade[index]) > i; i++) {
            listaFinal.push(parseFloat(tamanho));
        }
    })

    valorUsuario = tamanhoTabua - limiteCorte

    var resultados = calcularPossibilidades(listaFinal, valorUsuario)

    const divResultado = document.getElementById("divResultados");
    const divNovasDiv = document.getElementById("novasDiv");
    divResultado.removeChild(divNovasDiv);

    const novosResultados = document.createElement("div")
    novosResultados.id = "novasDiv"

    divResultado.insertBefore(novosResultados, null)
    

    resultados.forEach((resultado, index) => {
        const novaDiv = document.createElement("div")
        novaDiv.id = "novaDiv"
        novaDiv.className = "border border-success m-3 p-2"

        const texto = "Com " +  resultado.soma + "cm a " + (index + 1) + "ª melhor combinação é: "

        const textoDivDes = document.createElement("span")
        textoDivDes.innerHTML = texto
        novaDiv.appendChild(textoDivDes)
     
        resultado.listaValores.split(",").forEach(item => {
            const textoDiv = document.createElement("span")
            textoDiv.innerHTML = item
            textoDiv.className = "span-resultado"
            textoDiv.style
            novaDiv.appendChild(textoDiv)
        })


        const divResultado = document.getElementById("novasDiv")
        divResultado.insertBefore(novaDiv, null)
        
        

    })


}