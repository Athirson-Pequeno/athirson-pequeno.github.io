function pegaDados(){

const formData = new FormData(document.getElementById("form"));
const obj = Object.fromEntries(formData)

const transformation = Object.entries(obj).map(([key, value]) => ({ index : key === "tamanhoTabua" || key === "limiteCorte"  ? -1 : parseInt( key.slice(7) ) , [key === "tamanhoTabua" ? "tamanhoTabua" : key === "limiteCorte" ? "limiteCorte" : key.slice(0,7)]: value }));

console.log(transformation)

const listaTamanho = []
const listaQuantidade = []
var tamanhoTabua = 0
var limiteCorte = 0
var valorUsuario = 0


transformation.forEach(x=>{
    if(x.index === -1 && x.limiteCorte !== undefined){
        limiteCorte = x.limiteCorte
    }
    if(x.index === -1 && x.tamanhoTabua !== undefined){
        tamanhoTabua = x.tamanhoTabua
    }

    if(x.tamanho!==undefined){
        listaTamanho.push(x.tamanho)
    }
    if(x.quantid!==undefined){
        listaQuantidade.push(x.quantid)
    }
})

transformation.forEach(x=>{
    console.log(x.index)
   
})

const listaFinal = []

listaTamanho.forEach((tamanho, index)=>{
    for(var i = 0; parseInt(listaQuantidade[index]) > i ; i++){
        listaFinal.push(parseInt(tamanho));
    }
})

valorUsuario = tamanhoTabua - limiteCorte

var resultados = calcularPossibilidades(listaFinal, valorUsuario)
resultados.forEach((resultado, index)=>{
    document.write((index + 1) +"ª Melhor combinação: " + resultado.listaValores)
    document.write("<br>")
    document.write("Soma das tabuas " + resultado.soma)
    document.write("<hr>")
    console.log(resultado)
})
}