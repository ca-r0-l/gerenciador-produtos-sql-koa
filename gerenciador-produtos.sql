create database gerenciadorProdutos;
use gerenciadorProdutos;

alter table produtos drop constraint PK_produtos_id
drop table produtos

create table produtos
(
   id int identity(1,1) not null,
   nome varchar(100) not null,
   preco_unitario money not null,
   categoria smallint not null,
   constraint PK_produtos_id	primary key clustered (id)
)

alter table categorias drop constraint PK_categorias_id
drop table categorias

create table categorias
(
   id int identity(1,1) not null,
   nome varchar(100) not null
      constraint PK_categorias_id	primary key clustered (id)
)

alter table enderecos drop constraint PK_enderecos_id
drop table enderecos

create table enderecos
(
   id int identity(1,1) not null,
   rua varchar(100) not null,
   numero int not null,
   bairro varchar(50) not null,
   cidade varchar(100) not null,
   estado char(2) default 'SP',
   constraint PK_enderecos_id		primary key clustered (id)
)

alter table clientes drop constraint PK_clientes_id
alter table clientes drop constraint PK_clientes_endereco
drop table clientes

create table clientes
(
   id int identity(1,1) not null,
   nome varchar(100) not null,
   endereco int not null,
   celular varchar(9) not null,
   constraint PK_clientes_id		primary key clustered (id),
   constraint PK_clientes_endereco foreign key (endereco) references enderecos (id)
)

alter table pedidos drop constraint PK_pedidos_id
alter table pedidos drop constraint PK_pedidos_clientes
drop table pedidos

create table pedidos
(
   id int identity(1,1) not null,
   id_cliente int not null,
   valor_compra money not null,
   constraint PK_pedidos_id		primary key clustered (id),
   constraint PK_pedidos_clientes	foreign key (id_cliente) references clientes (id) 
		on update cascade
		on delete cascade
)


alter table pedidos_produtos drop constraint PK_pedidos_produtos_id
alter table pedidos_produtos drop constraint PK_pedidos_produtos_pedidos
alter table pedidos_produtos drop constraint PK_pedidos_produtos_produtos
drop table pedidos_produtos

create table pedidos_produtos
(
   id int identity(1,1) not null,
   id_pedido int not null,
   id_produto int not null,
   constraint PK_pedidos_produtos_id		primary key clustered (id),
   constraint PK_pedidos_produtos_pedidos foreign key (id_pedido) references pedidos (id),
   constraint PK_pedidos_produtos_produtos foreign key (id_produto) references produtos (id)
)



CREATE TYPE dbo.produto AS TABLE
    (
   idProduto INT
    ) 
GO


ALTER PROCEDURE addPedido
   @id_cliente int,
   @valor_compra money,
   @produtos dbo.produto READONLY
AS
	SET NOCOUNT ON;
	DECLARE @id int;
	declare @trancount int;
    set @trancount = @@trancount;
	BEGIN TRY

	  if @trancount = 0
            begin transaction
        else
            save transaction MySavePoint;

        INSERT INTO dbo.pedidos
   (id_cliente, valor_compra)
values
   (@id_cliente, @valor_compra);
		set @id = scope_identity();

        INSERT INTO [dbo].[pedidos_produtos]
select idProduto, @id
from @produtos;
		if @trancount = 0
            commit;
	END TRY
	BEGIN CATCH
	   ROLLBACK TRANSACTION MySavePoint;
		declare @error int, @message varchar(4000), @xstate int;
        select @error = ERROR_NUMBER(), @message = ERROR_MESSAGE(), @xstate = XACT_STATE();
        if @xstate = -1
            rollback;
        if @xstate = 1 and @trancount = 0
            rollback
        if @xstate = 1 and @trancount > 0
            rollback transaction MySavePoint;

        raiserror ('MySavePoint: %d: %s', 16, 1, @error, @message) ;
END CATCH


-- Declare @p as dbo.produto
-- INSERT INTO @p
-- VALUES
--    (31)

-- exec addPedido 4, 1.9, @p