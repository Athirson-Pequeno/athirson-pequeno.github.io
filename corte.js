

function calcularPossibilidades(listaDeItens, valor){

var listaDeValores = listaDeItens
var listaDeCombinacoes = []
var listaResultado = []
var listaFim = []
var listaDeSoma = []
var valorUsuario = valor

function combinacoes(conjunto, index){

    var tamanhoConjunto = index;

    function listaDeIndices(conjunto, indices){
        var valores = [];
        for (var i of indices){
            valores.push(conjunto[i])
        }
        
        if((!listaDeCombinacoes.includes(valores.sort(ordernar).toString()))){
            listaDeCombinacoes.push(valores.sort(ordernar).toString())

            return valores;
        }
        
    }

    if(tamanhoConjunto > conjunto.length){
        return [];
    }

    var resultado = []
    var indices = [...Array(tamanhoConjunto).keys()]

    resultado.push(listaDeIndices(conjunto, indices))

    while(true){
        var achou = false
        for(var i = tamanhoConjunto - 1;i >= 0 ; i--){
            if(indices[i] != i + conjunto.length - tamanhoConjunto){
                achou = true
                indices[i]++
                
            break
            }
        }
        if(!achou){
            break
        }
        for(var j = i + 1; j < tamanhoConjunto; j++){
            indices[j] = indices[j - 1] + 1
        }

        resultado.push(listaDeIndices(conjunto, indices))
    }
    

    return resultado
    
}


var sdsd = 0

for (var iFor = 0; listaDeValores.length !== 0; iFor++){
    for (var i = 0; i <= listaDeValores.length; i++){
       var lista =  combinacoes(listaDeValores, i)
       lista.forEach(item => {
        if(item !== undefined){
        var somaItens = somaArray(item)
        listaDeSoma.push(somaItens)
        if(somaItens === valorUsuario){
            i++
        }}
    })
    
}


var maisProximo = listaDeSoma.reduce(function(anterior, corrente) {

    return (Math.abs(corrente - valorUsuario) < Math.abs(anterior - valorUsuario) && corrente <= valorUsuario ? corrente : anterior);

  });  


listaDeCombinacoes.forEach(x =>{
    var soma = somaArray(x.split(","))
    if(soma <= maisProximo){
        listaResultado.push({
            "soma" : soma,
            "listaValores" : x
        })
    }
})



var menor =  listaDeValores.length + 1;
var indexMenor = 0;
listaResultado.sort(ordernarObj).forEach((x,i) =>{
    if(x.soma === maisProximo){
        if(x.listaValores.split(",").length < menor){
            menor = x.listaValores.split(",").length;
            indexMenor = listaResultado.indexOf(x)
        }
    }
})

var listaMenor = listaResultado[indexMenor]
listaFim.push(listaMenor)

listaMenor.listaValores.split(",").forEach((x,i)=>{
    var index = listaDeValores.indexOf(parseFloat(x))
    if(index > -1){
        listaDeValores.splice(index,1)
    }
})


 listaDeCombinacoes = []
 listaMenor = []
 listaDeSoma = []
 listaResultado = []
}

return listaFim

function ordernar(a,b){
    return b - a
}

function ordernarObj(a,b){
    return a.soma - b.soma
}

function somaArray(array){
    return array.reduce((acumulador, elemeto) => parseFloat( acumulador ) + parseFloat( elemeto ), 0)
}

}