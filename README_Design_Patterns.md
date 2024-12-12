# Aplicação de Design Patterns
Utilizado projeto IoT para aplicação de 5 Design Patterns que podem ser relevantes para o projeto.

## O que foi feito:
Dentro dos padrões de projeto que conseguimos estudar nesse tempo, foi analisado quais seriam possíveis de aplicar no projeto IoT, e o quanto isso geraria de valor.

    
## Como executar
* Para executar a aplicação é necessário estar em "TagSystemAPI" e executar o comando `dotnet watch run`.
* Depois ir para "ts_frontend" e executar o comando `npm install`, e logo após o comando `npm run dev`.


## Quais foram os cinco padrões de projetos utilizados
* **Facade**

* **Factory**

* **Decorator**

* **Singleton**

* **Composition**


## *Facade*
Foi aplicado o facade na função de login: 

* Primeiramente foi criada uma **interface** (`ILoginFacade`) com os métodos em contrato dela.

* Logo após, criada a **classe** `LoginFacade` que implementa a lógica dos métodos da interface citada anteriormente (`ILoginFacade`).

* E por final esses métodos foram utilizados na classe `LoginController` de forma mais limpa, como uma fachada para todo o processo que é realizado na classe `LoginFacade`.

Exemplo Facade:  
Classe `LoginFacade`:
```cs
public async Task<Login> CreateLoginAsync(LoginDTO loginDTO)
{
    var login = _loginFactory.CreateLogin(loginDTO.Username, loginDTO.Password);
    
    if (login == null)
    {
        throw new InvalidOperationException("Erro ao criar login.");
    }

    _context.Login.Add(login);
    await _context.SaveChangesAsync();
    return login;
}
```
Classe `LoginController`:
```cs
[HttpPost("Create")]
public async Task<ActionResult<Login>> CreateLogin(LoginDTO loginDTO)
{
    var login = await _LoginFacade.CreateLoginAsync(loginDTO);
    return CreatedAtAction(nameof(GetLogin), new { id = login.Id }, login);
}
```

## *Factory*
Foi aplicado no método de criar novo login.

* Inicialmente foi criada uma **interface** `ILoginFactory` com os métodos em contrato dela.

* Logo após, criada a **classe** `LoginFactory` a qual é delegada a função de criação do objeto, tirando essa responsabilidade da classe `LoginFacade`.

* E por final o método criado na `LoginFactory` é implementado na `LoginFacade` que não precisa saber como o objeto é contruido. Simplesmente ao chamar o método `CreateLogin` ele recebe o objeto pronto para uso.

* Caso futuramente seja necessário alterar a forma em que o **Login** é criado, isso pode ser feito apenas na `LoginFactory`, sem alterar o código da controller ou outras partes do sistema.

Exemplo Factory:

```cs
public Login CreateLogin(string username, string password)
{
    return new Login
    {
        Username = username,
        Password = password
    };
}
```

## *Builder*

* O *Builder Pattern* foi aplicado criando a classe AccessBuilder, responsável por encapsular a construção do objeto Access. Isso permite configurar os atributos de Access de forma fluente e sem a necessidade de chamar múltiplos construtores ou setters separados.

* *O que foi feito:*
Para tornar a criação de objetos mais fluida e flexível, foi implementado o Builder Pattern na classe de acesso do sistema. O padrão foi utilizado para permitir a construção do objeto Access de forma gradual, evitando que a lógica de construção fosse espalhada pelo código, o que pode gerar duplicação e tornar o sistema difícil de manter.

* O AccessBuilder oferece métodos como SetRfid(), SetRoom(), SetIsAuthorized(), e SetTimeAccess() para configurar o objeto Access antes de sua criação final com o método Build(). Esses métodos são chamados de forma encadeada (fluente), permitindo que o código de criação seja conciso e legível.

* Exemplo de validação no AccessBuilder:

```cs
public AccessBuilder SetRfid(int rfid)
{
    if (rfid <= 0)
        throw new ArgumentException("RFID deve ser maior que zero.");
    _access.Rfid = rfid;
    return this;
}
```



## *Singleton*

No contexto deste projeto, o *Sidebar* desempenha um papel crucial ao permitir a navegação entre diferentes telas e a mudança do tema da página. Para implementar a troca de tema de forma centralizada, o ThemeProvider é utilizado em conjunto com o React Context, permitindo que todos os componentes compartilhem o mesmo estado global de tema.

Enquanto o aplicativo utiliza um único ThemeProvider, o *ThemeContext* se comporta como um *Singleton*. Isso significa que existe uma única instância do tema centralizada e compartilhada entre todos os componentes que consomem o contexto usando o hook useTheme. 

### Código de inicialização do contexto:
```typescript
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```


Essa abordagem assegura que qualquer alteração no tema seja refletida em todos os componentes da aplicação que consomem esse contexto, garantindo consistência visual e funcional em toda a interface.

## *Composition*

A biblioteca *Shadcn* utilizada no projeto aplica o padrão *Composition* para criar componentes altamente reutilizáveis e configuráveis. Esse padrão permite compor componentes maiores a partir de subcomponentes menores, fornecendo flexibilidade para ajustar cada parte de acordo com as necessidades da aplicação.

### Exemplo prático na aplicação:
No componente UserTable, o padrão *Composition* é evidente. Ele utiliza o subcomponente CardFooter para exibir a paginação na parte inferior do componente. Por outro lado, no componente RegisterUserTable, o CardFooter está ausente, evidenciando que ambos compartilham uma estrutura básica semelhante, mas podem ser personalizados conforme o caso de uso.

Para facilitar a criação de componentes variáveis, foi implementado o InfoCard, cujas subpartes incluem:
- *InfoCardIcon*: Ícone opcional do cartão.
- *InfoCardTitle*: Título do cartão.

Essa separação permite criar variações do InfoCard, como:
```tsx
const InfoCard = ({ children }: { children: React.ReactNode }) => {
  return <div className="info-card">{children}</div>;
};

const InfoCardIcon = ({ icon }: { icon: React.ReactNode }) => {
  return <div className="info-card-icon">{icon}</div>;
};

const InfoCardTitle = ({ title }: { title: string }) => {
  return <h3 className="info-card-title">{title}</h3>;
};
```


### Uso no componente:
```tsx
<InfoCard>
  <InfoCardIcon icon={<SomeIcon />} />
  <InfoCardTitle title="Exemplo de Título" />
</InfoCard>
```


### Variações:
- Apenas o título:
```tsx
  <InfoCard>
    <InfoCardTitle title="Título Simples" />
  </InfoCard>
```
  
- Apenas o ícone:
```tsx
  <InfoCard>
    <InfoCardIcon icon={<SomeIcon />} />
  </InfoCard>
```
  

Essa abordagem melhora a consistência, reutilização e flexibilidade no design de componentes da aplicação, simplificando a manutenção e expansão futura.
 
## Autores
* Lucas Lima Leite
* Ricardo Ferreira Silva
* Gustavo Monteiro 
