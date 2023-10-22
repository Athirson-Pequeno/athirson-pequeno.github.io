function adicionarLinhaTabela(index) {

    var table = document.getElementById("tabela");
    table.insertRow(-1).innerHTML = `
    <td colspan="3">
        <div class="input-group input-group-sm">
            <input type="number" class="form-control" placeholder="Tamanho"
                aria-describedby="inputGroup-sizing-sm" name="tamanho${index}" required step=any>
        </div>
    </td>
    <td colspan="3">
        <div class="input-group input-group-sm">
            <input type="number" class="form-control" placeholder="Quantidade"
                aria-describedby="inputGroup-sizing-sm" name="quantid${index}" required step=any>
        </div>
    </td>
    <td colspan="1">
    <button onclick="deletarLinha(this)" tabindex="-1"
        style="background: transparent; border: 0px;">
            <input type="image" tabindex="-1" src="img/lixeira.png" height="20px" />
    </button>
    </td>`;

}

function removerLinhaTabela(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}