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
  
  https://call-list-api.onrender.com/
  (_Você pode utilizar Ctrl + botão esquerdo do mouse para abrir em uma nova aba_)
  
</details>

##

<details>
<summary>Criar um Novo Cadastro:</summary>

### Siga os passos para criar um novo cadastro

1. Na página inicial, clique no botão "Adicionar" para abrir o formulário de adição de novo contato.
   ![Captura de tela 2024-02-29 112932](https://github.com/MagalhaesVini/Lista-Telefonica/assets/105064550/c13520ca-4ae6-49c2-940e-2397df4d384e)

2. Preencha todos os campos obrigatórios, como nome e número de celular.
   ![Captura de tela 2024-02-29 114159](https://github.com/MagalhaesVini/Lista-Telefonica/assets/105064550/fb59a202-d429-485a-9112-d9de35ca2e2e)

3. Clique em "Enviar" para salvar o novo contato.
   ![Captura de tela 2024-02-29 114159](https://github.com/MagalhaesVini/Lista-Telefonica/assets/105064550/6908cbad-cc58-4d33-8a07-80c47cc247a8)

</details>

##

<details>
<summary>Buscar um Cadastro:</summary>

### Siga os passos para realizar a busca de um cadastro

1. Na barra de busca, digite o nome ou número de celular do contato desejado.
   
2. Pressione Enter ou clique no botão "Buscar".
   
3. Os resultados da busca serão exibidos na tela. Se nenhum campo de busca for preenchido, serão listados todos os contatos.
   ![Captura de tela 2024-02-29 114906](https://github.com/MagalhaesVini/Lista-Telefonica/assets/105064550/cee72390-55cb-4922-8440-16871f326820)

</details>

##

<details>
<summary>Editar um Cadastro:</summary>

### Siga os passos para editar cadastro

1. Após realizar a busca pelo contato desejado, clique no botão "Editar" ao lado do contato.
   ![Captura de tela 2024-02-29 114950](https://github.com/MagalhaesVini/Lista-Telefonica/assets/105064550/8689803a-57ec-45cb-a52b-19667586e933)

2. Uma mensagem de confirmação aparece; selecionar "Sim" abre o formulário de edição, enquanto "Não" cancela a operação.
   ![Captura de tela 2024-02-29 115033](https://github.com/MagalhaesVini/Lista-Telefonica/assets/105064550/4f697094-a8c5-4b9e-a55f-15b70a13f937)

3. O formulário de edição será aberto, permitindo que você atualize as informações do contato.

4. Após fazer as alterações desejadas, clique em "Salvar" para atualizar o contato.
   ![Captura de tela 2024-02-29 115100](https://github.com/MagalhaesVini/Lista-Telefonica/assets/105064550/ea4517cd-7ae3-4f3e-8c7f-b6211b1867f0)

</details>

##

<details>
<summary>Excluir um Cadastro:</summary>

### Siga os passos para excluir um cadastro

1. Após realizar a busca pelo contato que deseja excluir, clique no botão "Excluir" ao lado do contato.

2. Uma janela de confirmação será exibida. Clique em "Sim" para confirmar a exclusão ou "Não" para cancelar.
   ![Captura de tela 2024-02-29 115143](https://github.com/MagalhaesVini/Lista-Telefonica/assets/105064550/2a65ab7d-0f1f-4839-a9a9-5c616efab7a9)

_apos isso a caixa de mensagem deve aparecer informando que o item foi excluido._
 ![Captura de tela 2024-02-29 115231](https://github.com/MagalhaesVini/Lista-Telefonica/assets/105064550/94701b80-1ac8-445d-8a5a-cd5f8757c7e6)

</details>

##

 # Componentes

Os principais componentes do sistema são:

- **IconLabelButtons:** Exibe campos de busca por nome e número de celular, além de botões para abrir o formulário de adição de novos contatos.

- **Formulario:** Utilizado para adicionar novos contatos à lista telefônica.

- **FormularioEdicao:** Permite editar informações de contatos existentes.

- **DadosObtidos:** Responsável por exibir os contatos obtidos da busca e permitir expandir, editar ou excluir cada contato.

- **Busca:** Realiza requisições para buscar contatos na lista telefônica com base no nome ou número de celular fornecido.

## Contribuindo

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades. Se você encontrar algum problema ou tiver alguma sugestão, por favor, abra uma issue.

