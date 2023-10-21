function adicionarLinhaTabela(index){
    
    var table = document.getElementById("tabela");
    var row = table.insertRow(-1);
    
    row.insertCell(0).innerHTML = "Tamanho";
    row.insertCell(1).innerHTML = `<input  class="form-control" type="text" name="tamanho${index}" placeholder="Tamanho">`;
    row.insertCell(2).innerHTML = "Quantidade";
    row.insertCell(3).innerHTML = `<input  class="form-control" type="text" name="quantid${index}" placeholder="Quantidade">`;
    index++

}