
function pegaDados(diferenca) {

    const formData = new FormData(document.getElementById("form"));
    const obj = Object.fromEntries(formData)

    const transformation = Object.entries(obj).map(([key, value]) => ({ index: key === "tamanhoTabua" || key === "limiteCorte" ? -1 : parseInt(key.slice(7)), [key === "tamanhoTabua" ? "tamanhoTabua" : key === "limiteCorte" ? "limiteCorte" : key.slice(0, 7)]: value }));

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
        novaDiv.className = "border border-success mb-3 p-2"


        const texto = `${index + 1}ª tábua, ${resultado.soma}cm usados, cortar da seguinte forma`

        const textoDivDes = document.createElement("span")
        textoDivDes.innerHTML = texto
        novaDiv.appendChild(textoDivDes)
        novaDiv.appendChild(document.createElement("br"))

        const listaDeValores = resultado.listaValores.split(",")

        const resultadoFinal = []

        listaDeValores.forEach(item => {
            const texto = `${listaDeValores.filter(x => x === item).length} tábuas de ${item}cm`
            if (!resultadoFinal.includes(texto)) {
                resultadoFinal.push(texto)
            }
        })

        resultadoFinal.forEach(item => {
            const textoDiv = document.createElement("span")
            textoDiv.innerHTML = item
            textoDiv.className = "span-resultado mt-3"
            novaDiv.appendChild(textoDiv)
            novaDiv.appendChild(document.createElement("br"))
        })

        const sobraDeMaterial = document.createElement("span")
        sobraDeMaterial.innerHTML = `Irá sobrar ${diferenca - resultado.soma}cm`
        sobraDeMaterial.className = "span-resultado-sobra mt-3"
        novaDiv.appendChild(sobraDeMaterial)


        const divResultado = document.getElementById("novasDiv")
        divResultado.insertBefore(novaDiv, null)



    })


}
