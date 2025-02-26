function calcularPossibilidades(listaDeItens, valor) {
    // Ordena os itens em ordem decrescente para otimizar a seleção
    const itensOrdenados = [...listaDeItens].sort((a, b) => b - a);
    let remaining = [...itensOrdenados];
    const resultado = [];

    while (remaining.length > 0) {
        let melhorSoma = 0;
        let menorQtdItens = Infinity;
        let melhorMascara = 0;

        // Inicializa a tabela de PD: { [soma]: { count: qtdItens, mask: bitmask } }
        const dp = { 0: { count: 0, mask: 0 } };

        for (let i = 0; i < remaining.length; i++) {
            const item = remaining[i];
            const novosEstados = {};

            for (const [somaStr, estado] of Object.entries(dp)) {
                const soma = parseInt(somaStr);
                const novaSoma = soma + item;
                const novoCount = estado.count + 1;
                const novaMascara = estado.mask | (1 << i);

                // Ignora combinações que excedem o valor
                if (novaSoma > valor) continue;

                // Atualiza o estado se for melhor que o existente
                if (!dp[novaSoma] || novoCount < dp[novaSoma].count) {
                    if (!novosEstados[novaSoma] || novoCount < novosEstados[novaSoma].count) {
                        novosEstados[novaSoma] = { count: novoCount, mask: novaMascara };
                    }
                }
            }

            // Mescla os novos estados com a tabela DP, mantendo os ótimos
            Object.assign(dp, novosEstados);

            // Atualiza a melhor solução encontrada
            for (const [somaStr, estado] of Object.entries(novosEstados)) {
                const soma = parseInt(somaStr);
                if (soma > melhorSoma || (soma === melhorSoma && estado.count < menorQtdItens)) {
                    melhorSoma = soma;
                    menorQtdItens = estado.count;
                    melhorMascara = estado.mask;
                }
            }
        }

        // Caso nenhum subconjunto válido seja encontrado (itens maiores que o valor)
        if (melhorSoma === 0 && remaining.length > 0) {
            const maiorItem = remaining[0];
            resultado.push({ soma: maiorItem, listaValores: [maiorItem] });
            remaining = remaining.slice(1);
            continue;
        }

        // Extrai os itens selecionados da máscara de bits
        const selecionados = [];
        const novosRemaining = [];
        for (let i = 0; i < remaining.length; i++) {
            if (melhorMascara & (1 << i)) {
                selecionados.push(remaining[i]);
            } else {
                novosRemaining.push(remaining[i]);
            }
        }

        resultado.push({ soma: melhorSoma, listaValores: selecionados });
        remaining = novosRemaining;
    }

    return resultado;
}
