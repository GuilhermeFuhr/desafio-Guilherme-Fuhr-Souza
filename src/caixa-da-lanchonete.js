class CaixaDaLanchonete {

    FORMA_PAGAMENTO = {
        dinheiro: { taxa: 0.95 },
        debito: { taxa: 1 },
        credito: { taxa: 1.03 }
    }

    CARDAPIO = {
        cafe: { valor: 3.00 },
        chantily: { valor: 1.50 },
        suco: { valor: 6.20 },
        sanduiche: { valor: 6.50 },
        queijo: { valor: 2.00 },
        salgado: { valor: 7.25 },
        combo1: { valor: 9.50 },
        combo2: { valor: 7.50 }
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        var formaPagamento = this.FORMA_PAGAMENTO[metodoDePagamento]
        if (formaPagamento === undefined)
            return "Forma de pagamento inválida"

        if (itens === undefined || itens.length === 0)
            return "Nao há itens no carrinho de compra!"

        var itensConvertidos = []
        var cafeObrigatorio, sanduicheObrigatorio = false
        var valorTotal = 0

        for (const itemPedido of itens) {
            var itemPedidoArray = itemPedido.split(",")

            var itemCodigo = this.CARDAPIO[itemPedidoArray[0]]
            if (itemCodigo === undefined)
                return "Item invalido!"

            if (itemCodigo === this.CARDAPIO.chantily)
                cafeObrigatorio = true

            if (itemCodigo === this.CARDAPIO.queijo)
                sanduicheObrigatorio = true

            var itemQuantidade = parseInt(itemPedidoArray[1])
            if (itemQuantidade === 0)
                return "Quantidade invalida!"

            itensConvertidos.push(itemCodigo)
            valorTotal += itemCodigo.valor * itemQuantidade
        }

        if ((cafeObrigatorio && !itensConvertidos.includes(this.CARDAPIO.cafe)) ||
            (sanduicheObrigatorio && !itensConvertidos.includes(this.CARDAPIO.sanduiche)))
            return "Item extra não pode ser pedido sem o item principal"

        valorTotal *= formaPagamento.taxa   
        valorTotal = +(valorTotal.toFixed(2))
        return valorTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }
}

export { CaixaDaLanchonete };