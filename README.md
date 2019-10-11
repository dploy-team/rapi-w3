# RAPI-W3
rapi-w3 é uma biblioteca que auxilia no desenvolvimento de aplicações angular, contendo interceptors, componentes auxiliares, API service, etc...

## Instalação

```sh
$ npm i @dploy-team/rapi-w3 
```
> É necessário a configuração do registry do github
## Docs

### Autenticação
> O módulo de autenticação `W3AuthModule` contém todo o controle de sessão do usuário, e de permissões, para utilizar basta importar o módulo no `app.module.ts` e declarar a service nos providers. Ex:

```
    ...
    { provide: W3_AUTH_SERVICE, useClass: AuthService } // Pode se usar outra service que extenda de W3AuthAbstractService,
    ...
```

> O gerenciamento do estado do usuário logado é feito pelo `ngrx`

- Para buscar o usuário logado no servidor (recomendado fazer apenas uma vez, no primeiro componente carregado):
```typescript
  ...
  constructor(private store: Store<AuthState>){}
  ...
   this.store.dispatch(FindMe({});
```

- Para carregar o usuário logado do estado
```typescript
  ...
  constructor(private store: Store<AuthState>){}
  ...
   this.store.select(getCurrentUser)
```

- Para alterar o usuário logado 
```typescript
  ...
  constructor(private store: Store<AuthState>){}
  ...
   this.store.dispatch(updateMe({me: form.value});
```

- Para buscar as seções no servidor:
```typescript
  ...
  constructor(private store: Store<AuthState>){}
  ...
   this.store.dispatch(LoadSessions({params: this.params});
```

- Para carregar as sessões do estado
```typescript
  ...
  constructor(private store: Store<AuthState>){}
  ...
  this.store.select(getSessions)
```

- Para setar a sessão atual
```typescript
  ...
  constructor(private store: Store<AuthState>){}
  ...
  this.store.dispatch(SelectSession)
```

- Para carregar a sessão atual
```typescript
  ...
  constructor(private store: Store<AuthState>){}
  ...
  this.store.select(getCurrentSession)
```

- Para carregar dados de ACL do usuário logado
```typescript
  ...
  constructor(private store: Store<AuthState>){}
  ...
  this.store.select(getCurrentAcl)
```

- Para realizar login
```typescript
  ...
  constructor(private store: Store<AuthState>){}
  ...
  this.store.dispatch(login({email: this.email, password: this.password}))
```

- Para realizar logout
```typescript
  ...
  constructor(private store: Store<AuthState>){}
  ...
  this.store.dispatch(Logout({}))
```

### Notificação
> O módulo de notificação `W3NotificationModule` permite disparar toasts para notificar o usuário de algum evento, para utilizar basta importar o módulo no `app.module.ts`

## Uso
```typescript
  constructor(private _notification: W3NotificationService){}
  
  myMethod(){
    this._notification.notify("My notification, "bottom", 3000); //Posição default é bottom e duração padrão é 4000
    this._notification.info("Esta é uma informação", "Informação");
    this._notification.error("Este é um erro", "Erro");
    this._notification.success("Mensagem de sucesso", "Sucesso" );
    this._notification.warning("Mensagem de atenção", "Atenção!");
    this._notification.confirmDeleteDialog("Jonas Kahnwald", user); //Abre um dialog de confirmação de deleção e retorna um Observable com o resultado
    this._notification.confirmDialog("Tem certeza que deseja cancelar a edição?", "Cancelar edição", "warn", user)//Abre um dialog de confirmação e retorna um Observable com o resultado
    
  }
```
