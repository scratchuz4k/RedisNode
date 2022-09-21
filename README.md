
# RedisNode

1. Objectivo:
	1. Compreender os efeitos da utilização do Redis nos pedidos e tempos de resposta

2. Desenvolvimento:
	1. Contrução de um pequena app em node com 2 pedidos (photos e photos/id) a uma api.
	2. Disponibilização de um servidor em wsl para hospedar o redis-server

3. Resultados:
	1. Alterações visíveis nos tempos de resposta apôs o primeiro pedido




## Config

1. Instalar e aceder ao servidor em WSL 
	1. apt update
	2. apt-get install redis
	3. Iniciar o serviço com redis-sever
2. Instalar a app, correr o npm install e colocar em servico com o node
3. fazer o pedido com postman ao localhost:port/photos


## Resultados

![resultados](https://i.imgur.com/gSN15N2.png)