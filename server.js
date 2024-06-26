import express from 'express'
const app = express()

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const users = []
app.use(express.json())

//-----------------------ROTAS USUARIOS-----------------------------
app.get('/usuarios', async (req, res) => {
    const usuario = await prisma.usuario.findMany()

    res.status(200).json(usuario)
})

app.post('/usuarios', async (req, res) => {
    await prisma.usuario.create({
        data: {
            email: req.body.email,
            nome: req.body.nome
        }
    })

    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => {
    await prisma.usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            nome: req.body.nome
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.usuario.delete({
        where: {
            id: req.params.id
        }        
    })

    res.status(200).json({message: "Usuario excluido"})
})


//-----------------------ROTAS PRODUTOS-----------------------------
// Listar todos os produtos
app.get('/produtos', async (req, res) => {
    const produtos = await prisma.produto.findMany();
    res.status(200).json(produtos);
});

// Criar um novo produto
app.post('/produtos', async (req, res) => {
    const novoProduto = await prisma.produto.create({
        data: {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco
        }
    });
    res.status(201).json(novoProduto);
});

// Atualizar um produto existente
app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const produtoAtualizado = await prisma.produto.update({
        where: {
            id: id
        },
        data: {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco
        }
    });
    res.status(200).json(produtoAtualizado);
});

// Excluir um produto
app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.produto.delete({
        where: {
            id: id
        }
    });
    res.status(200).json({ message: "Produto excluído" });
});


//-----------------------ROTAS PEDIDO-----------------------------
// Listar todos os pedidos
app.get('/pedidos', async (req, res) => {
    const pedidos = await prisma.pedido.findMany();
    res.status(200).json(pedidos);
});

// Criar um novo pedido
app.post('/pedidos', async (req, res) => {
    const novoPedido = await prisma.pedido.create({
        data: {
            usuario_id: req.body.usuario_id,
            data_pedido: req.body.data_pedido,
            status: req.body.status
        }
    });
    res.status(201).json(novoPedido);
});

// Atualizar um pedido existente
app.put('/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    const pedidoAtualizado = await prisma.pedido.update({
        where: {
            id: id
        },
        data: {
            usuario_id: req.body.usuario_id,
            data_pedido: req.body.data_pedido,
            status: req.body.status
        }
    });
    res.status(200).json(pedidoAtualizado);
});

// Excluir um pedido
app.delete('/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.pedido.delete({
        where: {
            id: id
        }
    });
    res.status(200).json({ message: "Pedido excluído" });
});


//-----------------------ROTAS ITEM/PEDIDO-----------------------------

// Listar todos os itens de pedido
app.get('/itenspedido', async (req, res) => {
    const itensPedido = await prisma.itemPedido.findMany();
    res.status(200).json(itensPedido);
});

// Criar um novo item de pedido
app.post('/itenspedido', async (req, res) => {
    const novoItemPedido = await prisma.itemPedido.create({
        data: {
            pedido_id: req.body.pedido_id,
            produto_id: req.body.produto_id,
            quantidade: req.body.quantidade
        }
    });
    res.status(201).json(novoItemPedido);
});

// Atualizar um item de pedido existente
app.put('/itenspedido/:id', async (req, res) => {
    const { id } = req.params;
    const itemPedidoAtualizado = await prisma.itemPedido.update({
        where: {
            id: id
        },
        data: {
            pedido_id: req.body.pedido_id,
            produto_id: req.body.produto_id,
            quantidade: req.body.quantidade
        }
    });
    res.status(200).json(itemPedidoAtualizado);
});

// Excluir um item de pedido
app.delete('/itenspedido/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.itemPedido.delete({
        where: {
            id: id
        }
    });
    res.status(200).json({ message: "Item de pedido excluído" });
});

app.listen(3000)