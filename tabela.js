function adicionarLinhaTabela(index) {

    var table = document.getElementById("tabela");
    table.insertRow(-1).innerHTML = `
    <td colspan="3">
        <div class="input-group input-group-sm">
            <input type="number" class="form-control" placeholder="Tamanho"
                aria-describedby="inputGroup-sizing-sm" name="tamanho${index}">
        </div>
    </td>
    <td colspan="3">
        <div class="input-group input-group-sm">
            <input type="number" class="form-control" placeholder="Quantidade"
                aria-describedby="inputGroup-sizing-sm" name="quantid${index}">
        </div>
    </td>
    <td colspan="1">
        <input type="image" src="img/lixeira.png" height="20px" onclick="deletarLinha(this)" />
    </td>`;

}

function removerLinhaTabela(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}