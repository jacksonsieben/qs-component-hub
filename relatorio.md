# Introdução

O presente relatório documenta a análise detalhada do projeto **"Reparação de Componentes Eletrónicos"**. O trabalho foi conduzido no âmbito do laboratório de Qualidade de Software, com foco na identificação de melhorias na usabilidade, acessibilidade e qualidade geral do aplicativo.

O objetivo principal do trabalho foi elaborar um relatório completo das tarefas realizadas, descrevendo cada etapa do processo de análise, bem como apresentar conclusões e recomendações baseadas nos resultados obtidos. A análise foi fundamentada em técnicas e conceitos estudados ao longo da unidade curricular, incluindo o desenvolvimento de casos de teste, a aplicação de testes de sistema e aceitação, e a realização de um estudo de usabilidade e acessibilidade. As tarefas realizadas incluíram familiarização com o projeto, a extração e análise de requisitos, e a estruturação de casos de teste.

Com este trabalho, busca-se não apenas identificar os pontos fortes e fracos do projeto, mas também propor melhorias que possam aumentar seu valor para os usuários finais e sua competitividade no mercado. A abordagem adotada reforça a importância de práticas de qualidade de software na construção de soluções tecnológicas que atendam às expectativas dos usuários e das organizações.

# Requisitos Funcionais

Esses requisitos garantem o funcionamento eficiente da loja de componentes eletrônicos, proporcionando uma experiência de compra fácil e segura para os clientes e otimizando a gestão de operações para os administradores da loja. Serão detalhados os requisitos funcionais e essenciais neste capítulo. Esses requisitos têm por objetivo garantir que as novas funcionalidades atendam às necessidades dos usuários e aos objetivos de usabilidade.

Os **Requisitos Funcionais** para uma Loja de Componentes Eletrônicos descrevem as funcionalidades e comportamentos que o sistema da loja deve atender para atender às necessidades dos usuários e das operações do negócio.

## Lista de Requisitos Funcionais

1. **Realizar login com nome de usuário e senha**  
   Permite que os usuários acessem o sistema utilizando suas credenciais de autenticação.

2. **Realizar login automático ao acessar o sistema**  
   Efetua o login automaticamente se o usuário já tiver uma sessão ativa.

3. **Visualizar informações de serviços cadastrados**  
   Exibe uma lista detalhada de serviços registrados no sistema.

4. **Criar usuários com os tipos "Operador" ou "Administrador"**  
   Permite o cadastro de novos usuários com níveis de acesso específicos.

5. **Visualizar a lista de usuários cadastrados**  
   Exibe uma lista completa dos usuários registrados no sistema.

6. **Editar informações de usuários cadastrados**  
   Permite atualizar dados de usuários, como nome, e-mail e tipo de acesso.

7. **Excluir usuários cadastrados**  
   Remove permanentemente usuários do sistema.

8. **Validar a confirmação de senha durante o cadastro de usuários**  
   Garante que a senha informada seja igual à sua confirmação ao criar um usuário.

9. **Cadastrar usuários com campos obrigatórios**  
   Exige nome, nome de usuário, e-mail, tipo de usuário e senha para registrar um novo usuário.

10. **Cadastrar clientes com campos obrigatórios**  
    Exige nome, e-mail, morada, código postal e número de contribuinte para registrar um novo cliente.

11. **Editar informações de clientes cadastrados**  
    Permite atualizar informações de clientes já registrados.

12. **Visualizar a lista de clientes cadastrados**  
    Exibe uma lista completa de clientes registrados no sistema.

13. **Excluir clientes cadastrados**  
    Remove permanentemente clientes do sistema.

14. **Buscar clientes por qualquer parte dos campos cadastrados**  
    Permite pesquisar clientes utilizando qualquer informação relevante de seus registros.

# Requisitos Não Funcionais

## Desempenho

- O sistema deve responder às solicitações de visualização, edição e busca em **até 2 segundos** para bases de dados pequenas e médias.
- O sistema deve suportar **múltiplos acessos simultâneos** sem degradação perceptível no desempenho.

## Usabilidade

- A interface deve ser **intuitiva e de fácil navegação**, permitindo que operadores e administradores executem tarefas com o mínimo de treinamento.
- O sistema deve fornecer **mensagens de erro claras** e orientações para corrigir entradas inválidas.

## Compatibilidade

- O sistema deve ser **compatível com navegadores modernos** e dispositivos de diferentes tamanhos de tela.
- O banco de dados deve ser **escalável** para suportar um crescimento considerável de registros de usuários, clientes e serviços.

# Análise dos Resultados do ESLint

O arquivo de relatório do ESLint fornecido contém uma análise detalhada de vários arquivos JavaScript que compõem o projeto. O ESLint é uma ferramenta de linting amplamente utilizada para identificar e reportar problemas em código JavaScript, ajudando a manter a qualidade e a consistência do código. A seguir, são apresentados os principais pontos identificados na análise:

## 1. Problemas com Variáveis Não Definidas (`no-undef`)

O erro mais frequente no relatório é o `no-undef`, que ocorre quando uma variável ou função é utilizada sem ter sido previamente definida. Esse problema foi identificado em vários arquivos, como:

- `app.js`
- `authentication-handlers.js`
- `clients-handlers.js`
- `globalHandlers.js`
- `jobs-handlers.js`
- `messaging-handlers.js`
- `users-handlers.js`

### Exemplos:
- **`app.js`**: A função `require` foi utilizada em várias linhas, mas não foi definida em nenhum lugar. Isso pode ser resolvido garantindo que o módulo `require` seja corretamente importado ou definido no escopo global.
- **`app.js`**: O uso de `__dirname` também não foi definido. Esse problema pode ser resolvido garantindo que o código esteja sendo executado em um ambiente Node.js, onde `__dirname` é uma variável global.

## 2. Variáveis Não Utilizadas (`no-unused-vars`)

Outro problema comum é o `no-unused-vars`, que ocorre quando uma variável é declarada, mas nunca utilizada no código. Esse problema foi identificado em vários arquivos, como:

- `app.js`
- `clients-handlers.js`
- `globalHandlers.js`
- `jobs-handlers.js`

### Exemplos:
- **`app.js`**: As variáveis `request`, `response`, `reasonCode`, `description` e `row` foram declaradas, mas nunca utilizadas. Isso pode indicar código redundante ou variáveis que foram esquecidas durante o desenvolvimento.
- **`clients-handlers.js`**: A variável `rows` foi declarada em várias funções, mas nunca utilizada. Isso pode ser resolvido removendo as declarações desnecessárias ou utilizando as variáveis de forma apropriada.

## 3. Uso de Regras Depreciadas (`usedDeprecatedRules`)

O relatório também indica que algumas regras depreciadas foram utilizadas no código. Embora isso não seja um erro crítico, é recomendável atualizar o código para utilizar as regras mais recentes do ESLint, garantindo que o código esteja alinhado com as melhores práticas atuais.

## 4. Problemas com `console` e `module`

Em vários arquivos, como:

- `authentication-handlers.js`
- `clients-handlers.js`
- `jobs-handlers.js`

O ESLint reportou o uso de `console` e `module` sem que esses objetos estivessem definidos. Isso pode ser resolvido garantindo que o código esteja sendo executado em um ambiente onde `console` e `module` estão disponíveis, como em um ambiente Node.js.

## 5. Outros Problemas

O relatório também identificou outros problemas, como:

- **Uso de blocos de código vazios (`no-empty`)**
- **Acessos a métodos de protótipo de objetos (`no-prototype-builtins`)**

Esses problemas podem ser resolvidos seguindo as recomendações do ESLint, como evitar blocos de código vazios e utilizar métodos seguros para acessar propriedades de objetos.


A análise do ESLint revelou vários problemas que podem afetar a qualidade e a manutenibilidade do código. A maioria dos problemas identificados pode ser resolvida com ajustes simples, como:

- Remoção de variáveis não utilizadas.
- Correção de importações de módulos.
- Atualização de regras depreciadas.

A implementação dessas correções ajudará a garantir que o código esteja mais limpo, consistente e alinhado com as melhores práticas de desenvolvimento.

# Etapas para a Crítica Usando a ISO/IEC 25010:2011

## Revisão das Características de Qualidade da Norma

A norma **ISO/IEC 25010:2011** define oito características principais para avaliação de qualidade de software:

1. **Funcionalidade**
2. **Desempenho**
3. **Compatibilidade**
4. **Usabilidade**
5. **Confiabilidade**
6. **Segurança**
7. **Manutenibilidade**
8. **Portabilidade**

## Aplicação dos Critérios ao Projeto

Para cada característica relevante, avalie como o sistema se comporta atualmente. Com base nas funcionalidades e requisitos levantados, aqui estão alguns pontos iniciais:

### Funcionalidade
Refere-se ao conjunto de funções que o software oferece, que devem atender aos requisitos especificados, como a completude, precisão e adequação das funcionalidades.

- **Adequação funcional**: O sistema cobre autenticação, cadastro e gestão de usuários e clientes, e atende os requisitos funcionais básicos.
- **Sugestão**: Verificar se há validação rigorosa para prevenir inconsistências, como duplicidade de registros.

### Desempenho
Mede a capacidade do software de operar de forma eficiente, sob condições específicas, em termos de tempo de resposta e uso de recursos (como memória e CPU).

- **Eficiência**: O requisito não funcional específica resposta em até 2 segundos para bases pequenas e médias, mas a escalabilidade para grandes volumes não foi claramente mencionada.
- **Sugestão**: Realizar testes de carga e otimizar consultas de busca.

### Compatibilidade
Refere-se à capacidade do software de se integrar e operar com outros sistemas ou componentes de software, além de ser utilizável em diferentes ambientes de hardware ou software.

- **Interoperabilidade**: Não há menção à integração com sistemas externos.
- **Sugestão**: Explorar APIs ou padrões de interoperabilidade, caso isso seja necessário.

### Usabilidade
Avalia a facilidade de uso e aprendizagem do software, incluindo a experiência do usuário, a acessibilidade e a interação com o sistema.

- **Reconhecimento de usabilidade**: O sistema parece básico, mas mensagens de erro claras são mencionadas.
- **Sugestão**: Realizar testes com usuários para garantir que a interface seja intuitiva.

### Confiabilidade
Refere-se à capacidade do software de operar de maneira consistente, sem falhas ou erros, e de se recuperar de falhas quando necessário.

- **Recuperabilidade**: Não há menção a backup ou mecanismos de recuperação.
- **Sugestão**: Implementar estratégias de recuperação para evitar perda de dados.

### Segurança
A capacidade do software de proteger informações e dados contra acesso não autorizado, perdas ou danos, garantindo a confidencialidade, integridade e disponibilidade.

- **Confidencialidade**: A autenticação por senha existe, mas não menciona criptografia de dados.
- **Sugestão**: Implementar criptografia de senhas e reforçar a segurança de sessões.

### Manutenibilidade
Refere-se à facilidade com que o software pode ser modificado, corrigido ou melhorado, incluindo a facilidade de realizar manutenção adaptativa, corretiva, evolutiva e preventiva.

- **Modularidade**: O uso de ferramentas como ESLint sugere que o código está sendo padronizado.
- **Sugestão**: Revisar o código para garantir alta coesão e baixo acoplamento.

### Portabilidade
Avalia a facilidade com que o software pode ser transferido de um ambiente para outro, incluindo a instalação e a adaptação em diferentes plataformas de hardware e software.

- **Adaptabilidade**: O sistema é descrito como compatível com navegadores modernos.
- **Sugestão**: Realizar testes em diferentes dispositivos para garantir que a responsividade está adequada.

## Críticas

Com base na análise:

### Pontos Fortes
- Funcionalidades básicas bem definidas e alinhadas aos objetivos do sistema.
- Uso de ferramentas para melhoria da qualidade do código.
- Foco em requisitos não funcionais como desempenho e usabilidade.

### Pontos a Melhorar
- **Segurança**: Implementar práticas robustas como criptografia e controle de sessão.
- **Desempenho**: Realizar testes de carga para escalabilidade.
- **Manutenibilidade**: Garantir uma arquitetura modular para facilitar futuras melhorias.
- **Confiabilidade**: Planejar estratégias de backup e recuperação.

# Estruturação de Casos de Teste

## Realizar Login com Nome de Usuário e Senha

Permite que os usuários acessem o sistema utilizando suas credenciais de autenticação e respeitando os pré-requisitos seguintes:

- Campos de entrada para nome de usuário e senha.
- Botão de envio para submeter as credenciais.
- Validação básica para garantir que os campos não estão vazios.
- Feedback de erro caso as credenciais estejam incorretas.

### Tabela 1.1 - Login Bem-Sucedido com Credenciais Válidas

| Teste Case ID | Entrada           | Resultado Esperado                          |
|---------------|-------------------|---------------------------------------------|
| TCA_001       | Nome de usuário: `user123` <br> Senha: `senha123` | Login realizado com sucesso. Redireciona para a página inicial do sistema. |

### Tabela 1.2 - Login Falha com Nome de Usuário Incorreto

| Teste Case ID | Entrada           | Resultado Esperado                          |
|---------------|-------------------|---------------------------------------------|
| TCA_002       | Nome de usuário: `user999` <br> Senha: `senha123` | Exibe mensagem de erro: "Nome de usuário ou senha incorretos". |

### Tabela 1.3 - Login Falha com Senha Incorreta

| Teste Case ID | Entrada           | Resultado Esperado                          |
|---------------|-------------------|---------------------------------------------|
| TCA_003       | Nome de usuário: `user123` <br> Senha: `senha999` | Exibe mensagem de erro: "Nome de usuário ou senha incorretos". |

### Tabela 1.4 - Login Falha com Campos Vazios

| Teste Case ID | Entrada           | Resultado Esperado                          |
|---------------|-------------------|---------------------------------------------|
| TCA_004       | Nome de usuário: (vazio) <br> Senha: (vazio) | Exibe mensagem de erro: "Preencha todos os campos obrigatórios". |

---

## Realizar Login Automático ao Acessar o Sistema

Efetua o login automaticamente se o usuário já tiver uma sessão ativa. Uma abordagem comum é utilizar cookies ou o armazenamento local (`localStorage`/`sessionStorage`) para armazenar informações de login (como um token de autenticação) e verificar essas informações ao carregar a página.

### Tabela 2.1 - Login Automático com Sessão Ativa

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_001       | Usuário já logado anteriormente (sessão ativa) | Redireciona automaticamente para a página inicial do sistema. |

### Tabela 2.2 - Login Automático Falha sem Sessão Ativa

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_002       | Usuário não está logado (sessão expirada ou inexistente) | Redireciona para a página de login. |

---

## Visualizar Informações de Serviços Cadastrados

Exibe uma lista detalhada de serviços registrados no sistema. Consulte e visualize de forma rápida as informações dos serviços cadastrados para um melhor acompanhamento.

### Tabela 3.1 - Visualizar Lista de Serviços

| Teste Case ID | Entrada                | Resultado Esperado                          |
|---------------|------------------------|---------------------------------------------|
| TCA_001       | Acessar a página de serviços | Exibe uma lista detalhada de todos os serviços cadastrados. |

### Tabela 3.2 - Visualizar Lista de Serviços Vazia

| Teste Case ID | Entrada                | Resultado Esperado                          |
|---------------|------------------------|---------------------------------------------|
| TCA_002       | Nenhum serviço cadastrado no sistema | Exibe mensagem: "Nenhum serviço cadastrado". |

---

## Criar Usuários com os Tipos "Operador" ou "Administrador"

Permite o cadastro de novos usuários com níveis de acesso específicos. Alguns exemplos comuns são:

- **Administrador**: Tem acesso completo a todas as funcionalidades do sistema.
- **Operador**: Pode gerenciar usuários e moderar conteúdo, mas com algumas restrições.

### Tabela 4.1 - Cadastrar Usuário do Tipo "Operador"

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_001       | Nome: `João Silva` <br> Nome de usuário: `joao.silva` <br> E-mail: `joao@exemplo.com` <br> Tipo: `Operador` <br> Senha: `senha123` <br> Confirmação de senha: `senha123` | Usuário cadastrado com sucesso. |

### Tabela 4.2 - Cadastrar Usuário do Tipo "Administrador"

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_002       | Nome: `Maria Souza` <br> Nome de usuário: `maria.souza` <br> E-mail: `maria@exemplo.com` <br> Tipo: `Administrador` <br> Senha: `senha456` <br> Confirmação de senha: `senha456` | Usuário cadastrado com sucesso. |

### Tabela 4.3 - Cadastrar Usuário com Campos Obrigatórios Faltando

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_003       | Campos obrigatórios faltando (todos vazios) | Exibe mensagem de erro: "Preencha todos os campos obrigatórios". |

---

## Visualizar a Lista de Usuários Cadastrados

Exibe uma lista completa dos usuários registrados no sistema, dependendo do nível de permissão.

### Tabela 5.1 - Visualizar Lista de Usuários

| Teste Case ID | Entrada                | Resultado Esperado                          |
|---------------|------------------------|---------------------------------------------|
| TCA_001       | Acessar a página de usuários | Exibe uma lista completa de todos os usuários cadastrados. |

### Tabela 5.2 - Visualizar Lista de Usuários Vazia

| Teste Case ID | Entrada                | Resultado Esperado                          |
|---------------|------------------------|---------------------------------------------|
| TCA_002       | Nenhum usuário cadastrado no sistema | Exibe mensagem: "Nenhum usuário cadastrado". |

---

## Editar Informações de Usuários Cadastrados

Permite atualizar dados de usuários, como nome, e-mail e tipo de acesso.

### Tabela 6.1 - Editar Nome de um Usuário

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_001       | Nome Atual: `João Silva` <br> Nome Atualizado: `João Oliveira` | Nome atualizado com sucesso. |

### Tabela 6.2 - Editar E-mail de um Usuário

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_002       | E-mail Atual: `joao@exemplo.com` <br> E-mail Atualizado: `joao.oliveira@exemplo.com` | E-mail atualizado com sucesso. |

### Tabela 6.3 - Editar Usuário com Campos Obrigatórios Faltando

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_003       | Campos obrigatórios faltando (todos vazios) | Exibe mensagem de erro: "Preencha todos os campos obrigatórios". |

---

## Excluir Usuários Cadastrados

Remove permanentemente usuários do sistema.

### Tabela 7.1 - Excluir um Usuário

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_001       | Selecionar usuário "João Silva" e clicar em "Excluir" | Usuário removido com sucesso. |

### Tabela 7.2 - Tentar Excluir um Usuário Inexistente

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_002       | Tentar excluir um usuário que já foi removido | Exibe mensagem de erro: "Usuário não encontrado". |

---

## Validar a Confirmação de Senha Durante o Cadastro de Usuários

Garante que a senha informada seja igual à sua confirmação ao criar um usuário.

### Tabela 8.1 - Senha e Confirmação de Senha Iguais

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_001       | Senha: `senha123` <br> Confirmação de senha: `senha123` | Cadastro realizado com sucesso. |

### Tabela 8.2 - Senha e Confirmação de Senha Diferentes

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_002       | Senha: `senha123` <br> Confirmação de senha: `senha456` | Exibe mensagem de erro: "As senhas não coincidem". |

---

## Cadastrar Usuários com Campos Obrigatórios

Exige nome, nome de usuário, e-mail, tipo de usuário e senha para registrar um novo usuário.

### Tabela 9.1 - Cadastrar Usuário com Todos os Campos Obrigatórios Preenchidos

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_001       | Nome: `Ana Costa` <br> Nome de usuário: `ana.costa` <br> E-mail: `ana@exemplo.com` <br> Tipo: `Operador` <br> Senha: `senha789` <br> Confirmação de senha: `senha789` | Usuário cadastrado com sucesso. |

### Tabela 9.2 - Cadastrar Usuário com Campos Obrigatórios Faltando

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_002       | Campos obrigatórios faltando (todos vazios) | Exibe mensagem de erro: "Preencha todos os campos obrigatórios". |

---

## Cadastrar Clientes com Campos Obrigatórios

Exige nome, e-mail, morada, código postal e número de contribuinte para registrar um novo cliente.

### Tabela 10.1 - Cadastrar Cliente com Todos os Campos Obrigatórios Preenchidos

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_001       | Nome: `Carlos Mendes` <br> E-mail: `carlos@exemplo.com` <br> Morada: `Rua A, 123` <br> Código Postal: `12345-678` <br> Número de Contribuinte: `123456789` | Cliente cadastrado com sucesso. |

### Tabela 10.2 - Cadastrar Cliente com Campos Obrigatórios Faltando

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_002       | Campos obrigatórios faltando (todos vazios) | Exibe mensagem de erro: "Preencha todos os campos obrigatórios". |

---

## Editar Informações de Clientes Cadastrados

Permite atualizar informações de clientes já registrados.

### Tabela 11.1 - Editar E-mail de um Cliente

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_001       | E-mail Atual: `carlos@exemplo.com` <br> E-mail Atualizado: `carlos.mendes@exemplo.com` | E-mail atualizado com sucesso. |

### Tabela 11.2 - Editar Cliente com Campos Obrigatórios Faltando

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_002       | Campos obrigatórios faltando (todos vazios) | Exibe mensagem de erro: "Preencha todos os campos obrigatórios". |

---

## Visualizar a Lista de Clientes Cadastrados

Exibe uma lista completa de clientes registrados no sistema.

### Tabela 12.1 - Visualizar Lista de Clientes

| Teste Case ID | Entrada                | Resultado Esperado                          |
|---------------|------------------------|---------------------------------------------|
| TCA_001       | Acessar a página de clientes | Exibe uma lista completa de todos os clientes cadastrados. |

### Tabela 12.2 - Visualizar Lista de Clientes Vazia

| Teste Case ID | Entrada                | Resultado Esperado                          |
|---------------|------------------------|---------------------------------------------|
| TCA_002       | Nenhum cliente cadastrado no sistema | Exibe mensagem: "Nenhum cliente cadastrado". |

---

## Excluir Clientes Cadastrados

Remove permanentemente clientes do sistema.

### Tabela 13.1 - Excluir um Cliente

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_001       | Selecionar cliente "Carlos Mendes" e clicar em "Excluir" | Cliente removido com sucesso. |

### Tabela 13.2 - Tentar Excluir um Cliente Inexistente

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_002       | Tentar excluir um cliente que já foi removido | Exibe mensagem de erro: "Cliente não encontrado". |

---

## Buscar Clientes por Qualquer Parte dos Campos Cadastrados

Permite pesquisar clientes utilizando qualquer informação relevante de seus registros.

### Tabela 14.1 - Buscar Cliente por Nome

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_001       | Termo de busca: `Carlos` | Exibe todos os clientes com "Carlos" no nome. |

### Tabela 14.2 - Buscar Cliente por E-mail

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_002       | Termo de busca: `carlos@exemplo.com` | Exibe o cliente com o e-mail correspondente. |

### Tabela 14.3 - Buscar Cliente com Termo Inexistente

| Teste Case ID | Entrada                              | Resultado Esperado                          |
|---------------|--------------------------------------|---------------------------------------------|
| TCA_003       | Termo de busca: `inexistente` | Exibe mensagem: "Nenhum cliente encontrado". |

# Testes Unitários com Mocha

Foram realizados **44 testes unitários** utilizando o framework **Mocha** para garantir a qualidade e a funcionalidade do código. Os testes cobriram diversas partes do sistema, incluindo funções de autenticação, handlers de clientes, jobs, mensagens e usuários, além de middlewares e funções auxiliares. A seguir, é apresentada uma análise detalhada dos testes realizados:

---

## 1. Função `isUserLoggedIn`

- **Teste 1**: Verifica se a função retorna `false` quando o usuário não está logado.
- **Teste 2**: Verifica se a função retorna `true` quando o usuário está logado.

**Resultado**: Ambos os testes passaram, confirmando que a função `isUserLoggedIn` funciona corretamente para identificar o estado de autenticação do usuário.

---

## 2. Middleware de Redirecionamento

- **Teste 1**: Verifica se o middleware redireciona para `/login.html` quando o usuário não está logado.
- **Teste 2**: Verifica se o middleware chama a função `next()` quando o usuário está logado.

**Resultado**: Os testes passaram, confirmando que o middleware de redirecionamento funciona conforme o esperado.

---

## 3. Função `login`

- **Teste 1**: Verifica se a função retorna o status `500` em caso de erro de conexão com o banco de dados.
- **Teste 2**: Verifica se a função retorna o status `401` quando as credenciais são inválidas.
- **Teste 3**: Verifica se a função autentica o usuário e o adiciona à sessão quando as credenciais são válidas.

**Resultado**: Todos os testes passaram, confirmando que a função `login` lida corretamente com diferentes cenários de autenticação.

---

## 4. Handlers de Clientes (`Clients Handlers`)

- **`getClients`**: Testes verificam se a função retorna uma lista de clientes e se lida corretamente com erros.
- **`editClient`**: Testes verificam se a função atualiza um cliente com sucesso e se retorna erros adequadamente.
- **`deleteClient`**: Testes verificam se a função deleta um cliente com sucesso e se retorna erros adequadamente.
- **`createClient`**: Testes verificam se a função cria um cliente com sucesso e se retorna erros adequadamente.

**Resultado**: Todos os testes passaram, confirmando que os handlers de clientes funcionam conforme o esperado.

---

## 5. Função `logout`

- **Teste**: Verifica se a função remove o usuário da sessão e retorna o status `200`.

**Resultado**: O teste passou, confirmando que a função `logout` funciona corretamente.

---

## 6. Handlers de Jobs (`Jobs Handlers`)

- **`getListJobs`**: Testes verificam se a função retorna uma lista de jobs para o tipo "ME" e se lida corretamente com erros.
- **`getUserInfoInitState`**: Testes verificam se a função retorna o estado inicial da página e se lida corretamente com erros.
- **`editJobInfo`**: Testes verificam se a função atualiza as informações do job com sucesso e se retorna erros adequadamente.
- **`createJob`**: Testes verificam se a função cria um job com sucesso e se retorna erros adequadamente.
- **`reopenJob`**: Testes verificam se a função reabre um job com sucesso e se retorna erros adequadamente.
- **`editOrderPriority`**: Testes verificam se a função atualiza a prioridade dos jobs com sucesso e se retorna erros adequadamente.

**Resultado**: Todos os testes passaram, confirmando que os handlers de jobs funcionam conforme o esperado.

---

## 7. Handlers de Mensagens (`Messaging Handlers`)

- **`loadWebSocketSettings`**: Testes verificam se a função carrega as configurações do WebSocket com sucesso e se lida corretamente com erros.
- **`messagingInsertNew`**: Testes verificam se a função insere uma nova mensagem com sucesso e se retorna `-1` em caso de erro.
- **`loadWebSocketMessages`**: Testes verificam se a função carrega as mensagens do WebSocket com sucesso e se lida corretamente com erros.

**Resultado**: Todos os testes passaram, confirmando que os handlers de mensagens funcionam conforme o esperado.

---

## 8. Handlers de Usuários (`Users Handlers`)

- **`getUsers`**: Testes verificam se a função retorna uma lista de usuários e se lida corretamente com erros.
- **`createUser`**: Testes verificam se a função cria um usuário com sucesso e se retorna erros adequadamente.
- **`editUser`**: Testes verificam se a função edita um usuário com sucesso e se retorna erros adequadamente.
- **`deleteUser`**: Testes verificam se a função deleta um usuário com sucesso e se retorna erros adequadamente.
- **`getPageSettings`**: Testes verificam se a função carrega as configurações da página com sucesso e se lida corretamente com erros.

**Resultado**: Todos os testes passaram, confirmando que os handlers de usuários funcionam conforme o esperado.

# Conclusão

O presente relatório documentou a análise detalhada do projeto **"Reparação de Componentes Eletrónicos"**, realizado no âmbito do laboratório de **Qualidade de Software**. A análise focou na identificação de melhorias na **usabilidade**, **acessibilidade** e **qualidade geral** do aplicativo, utilizando técnicas e conceitos estudados ao longo da unidade curricular, como desenvolvimento de casos de teste, testes de sistema e aceitação, e estudos de usabilidade e acessibilidade.

## Pontos Fortes
- **Funcionalidades Básicas Bem Definidas**: O sistema cobre autenticação, cadastro e gestão de usuários e clientes, atendendo aos requisitos funcionais básicos.
- **Uso de Ferramentas de Qualidade**: A aplicação de ferramentas como **ESLint** e **Mocha** demonstra um compromisso com a padronização e a qualidade do código.
- **Foco em Requisitos Não Funcionais**: A atenção a aspectos como desempenho, usabilidade e segurança reforça a preocupação com a experiência do usuário e a robustez do sistema.

## Pontos a Melhorar
- **Segurança**: A implementação de práticas robustas, como criptografia de senhas e controle de sessão, é essencial para garantir a confidencialidade e integridade dos dados.
- **Desempenho**: Testes de carga e otimização de consultas são necessários para garantir a escalabilidade do sistema, especialmente em cenários com grandes volumes de dados.
- **Manutenibilidade**: A revisão da arquitetura do código para garantir alta coesão e baixo acoplamento facilitará futuras melhorias e manutenções.
- **Confiabilidade**: Estratégias de backup e recuperação devem ser implementadas para evitar perda de dados e garantir a disponibilidade do sistema.

## Recomendações
1. **Melhorias na Segurança**:
   - Implementar criptografia de senhas.
   - Reforçar o controle de sessões para evitar acessos não autorizados.

2. **Otimização de Desempenho**:
   - Realizar testes de carga para avaliar a escalabilidade do sistema.
   - Otimizar consultas ao banco de dados para reduzir o tempo de resposta.

3. **Refinamento da Usabilidade**:
   - Realizar testes de usabilidade com usuários reais para identificar pontos de melhoria na interface.
   - Garantir que as mensagens de erro sejam claras e orientem o usuário a corrigir problemas.

4. **Melhoria na Manutenibilidade**:
   - Revisar a arquitetura do código para garantir modularidade e facilidade de manutenção.
   - Documentar o código e os processos para facilitar futuras atualizações.

5. **Implementação de Estratégias de Confiabilidade**:
   - Criar rotinas de backup automático para evitar perda de dados.
   - Implementar mecanismos de recuperação em caso de falhas.

## Considerações Finais
A análise realizada demonstrou que o projeto possui uma base sólida, com funcionalidades bem definidas e alinhadas aos objetivos do sistema. No entanto, há oportunidades significativas para melhorias, especialmente em áreas como segurança, desempenho e manutenibilidade. A implementação das recomendações propostas contribuirá para aumentar o valor do sistema para os usuários finais e sua competitividade no mercado.

Este trabalho reforça a importância das práticas de qualidade de software na construção de soluções tecnológicas que atendam às expectativas dos usuários e das organizações. A continuidade dos esforços para aprimorar o sistema garantirá sua evolução e adaptação às necessidades futuras.