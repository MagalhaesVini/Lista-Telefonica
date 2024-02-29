# Sistema de Lista Telefônica

## Descrição:
        
O Sistema de Lista Telefônica é uma aplicação web desenvolvida em React
que permite gerenciar contatos e realizar buscas por nome ou número de celular. 
Utiliza a API [Call-List](https://github.com/MagalhaesVini/Call-List-API/blob/main/README.md)
(_Você pode utilizar Ctrl + botão esquerdo do mouse para abrir em uma nova aba_) como fonte de dados para armazenar e recuperar informações dos contatos.

##

  ### Funcionalidades:

| Função | Descrição |
| --- | --- |
| Adicionar novo contato |  Permite adicionar um novo contato à lista telefônica, fornecendo informações como nome, documento de identificação, empresa, setor e números de telefone. |
| Buscar contato | Possibilita buscar contatos na lista telefônica por nome ou número de celular. Se nenhum campo de busca for preenchido, serão listados todos os contatos. |
| Editar contato | Permite editar as informações de um contato existente na lista telefônica, incluindo nome, documento de identificação, empresa, setor e números de telefone. |
| Excluir contato | Permite excluir um contato da lista telefônica. |

##

   ## Como Usar

<details>
        
  <summary>Acessar o Sistema:</summary>
  
  ### Acesse o sistema através do link fornecido após a implantação no Vercel
  
  https://lista-telefonica-ruddy.vercel.app/
  (_Você pode utilizar Ctrl + botão esquerdo do mouse para abrir em uma nova aba_)
  
</details>

##

<details>
<summary>Criar um Novo Cadastro:</summary>

1. Na página inicial, clique no botão "Adicionar" para abrir o formulário de adição de novo contato.
2. Preencha todos os campos obrigatórios, como nome e número de celular.
3. Clique em "Enviar" para salvar o novo contato.

</details>

##

<details>
<summary>Buscar um Cadastro:</summary>

1. Na barra de busca, digite o nome ou número de celular do contato desejado.
2. Pressione Enter ou clique no botão "Buscar".
3. Os resultados da busca serão exibidos na tela. Se nenhum campo de busca for preenchido, serão listados todos os contatos.

</details>

##

<details>
<summary>Editar um Cadastro:</summary>

1. Após realizar a busca pelo contato desejado, clique no botão "Editar" ao lado do contato.
2. O formulário de edição será aberto, permitindo que você atualize as informações do contato.
3. Após fazer as alterações desejadas, clique em "Salvar" para atualizar o contato.

</details>

##

<details>
<summary>Excluir um Cadastro:</summary>

1. Após realizar a busca pelo contato que deseja excluir, clique no botão "Excluir" ao lado do contato.
2. Uma janela de confirmação será exibida. Clique em "Sim" para confirmar a exclusão ou "Não" para cancelar.

</details>

  ## Componentes
  
  Os principais componentes do sistema são:

            IconLabelButtons: Exibe campos de busca por nome e número de celular, além de botões para abrir o formulário de adição de novos contatos.
            
            Formulario: Utilizado para adicionar novos contatos à lista telefônica.
            
            FormularioEdicao: Permite editar informações de contatos existentes.
            
            DadosObtidos: Responsável por exibir os contatos obtidos da busca e permitir expandir, editar ou excluir cada contato.
            
            Busca: Realiza requisições para buscar contatos na lista telefônica com base no nome ou número de celular fornecido.

##

  ## Contribuindo

        Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades. Se você encontrar algum problema ou tiver alguma sugestão, por favor, abra uma issue.
        
##
