create database gerenciadorProdutos;
use gerenciadorProdutos;

create table produtos(
	id							int identity(1,1) not null,
	nome						varchar(100) not null,
	preco_unitario				money not null,
	categoria					smallint not null,
	constraint PK_produtos_id	primary key clustered (id)
);

create table categorias(
	id							int identity(1,1) not null,
	nome						varchar(100) not null
	constraint PK_categorias_id	primary key clustered (id)
);

create table enderecos (
	id								int identity(1,1) not null,
	rua								varchar(100) not null,
	numero							int not null,
	bairro							varchar(50) not null,
	cidade							varchar(100) not null,
	estado							char(2) default 'SP',
	constraint PK_enderecos_id		primary key clustered (id)
);

create table clientes (
	id								int identity(1,1) not null,
	nome							varchar(100) not null,
	endereco						int not null,
	celular							varchar(9) not null,
	constraint PK_clientes_id		primary key clustered (id),
	constraint PK_clientes_endereco foreign key (endereco) references enderecos (id)
		on delete cascade
		on update cascade
);

create table pedidos (
	id								int identity(1,1) not null,
	id_cliente						int not null,
	valor_compra					money not null,
	constraint PK_pedidos_id		primary key clustered (id),
	constraint PK_pedidos_clientes	foreign key (id_cliente) references clientes (id) 
		on update cascade
		on delete cascade
)

create table pedidos_produtos (
	id								int identity(1,1) not null,
	id_pedido						int not null,
	id_produto						int not null,
	constraint PK_pedidos_produtos_id		primary key clustered (id),
	constraint PK_pedidos_produtos_pedidos foreign key (id_pedido) references pedidos (id) 
		on update cascade
		on delete cascade,

	constraint PK_pedidos_produtos_produtos foreign key (id_produto) references produtos (id) 
		on update cascade
		on delete cascade
)