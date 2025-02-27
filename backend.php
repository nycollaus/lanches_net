<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "LanchesNet";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Função para calcular o frete
function calcularFrete($cep) {
    // Lógica para calcular o frete baseado no CEP
    // Aqui você pode integrar com uma API de cálculo de frete
    return 10.00; // Exemplo de valor fixo
}

// Função para finalizar o pedido
function finalizarPedido($cliente_id, $itens, $total, $conn) {
    $sql = "INSERT INTO Pedidos (cliente_id, total) VALUES ('$cliente_id', '$total')";
    if ($conn->query($sql) === TRUE) {
        $pedido_id = $conn->insert_id;
        foreach ($itens as $item) {
            $produto_id = $item['id'];
            $quantidade = $item['quantidade'];
            $sql = "INSERT INTO ItensPedido (pedido_id, produto_id, quantidade) VALUES ('$pedido_id', '$produto_id', '$quantidade')";
            $conn->query($sql);
        }
        return $pedido_id;
    } else {
        return false;
    }
}

// Função para atualizar o sistema de fidelidade
function atualizarFidelidade($cliente_id, $conn) {
    $sql = "UPDATE Clientes SET pedidos = pedidos + 1 WHERE id = '$cliente_id'";
    $conn->query($sql);
    $sql = "SELECT pedidos FROM Clientes WHERE id = '$cliente_id'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($row['pedidos'] % 5 == 0) {
            return true; // Cliente ganhou um produto grátis
        }
    }
    return false;
}

// Exemplo de uso
$cliente_id = 1;
$itens = [
    ['id' => 1, 'quantidade' => 2],
    ['id' => 2, 'quantidade' => 1]
];
$total = 43.70;
$pedido_id = finalizarPedido($cliente_id, $itens, $total, $conn);
if ($pedido_id) {
    $frete = calcularFrete("23000-000");
    $total_com_frete = $total + $frete;
    $ganhou_produto_gratis = atualizarFidelidade($cliente_id, $conn);
    echo "Pedido finalizado com sucesso! Total com frete: R$ " . number_format($total_com_frete, 2);
    if ($ganhou_produto_gratis) {
        echo " Parabéns! Você ganhou um produto grátis!";
    }
} else {
    echo "Erro ao finalizar o pedido.";
}

$conn->close();
?>