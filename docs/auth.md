

COnfigure AUTH

        // Auth
        {provide: W3_AUTH_SERVICE, useClass: W3AuthService},
        {provide: W3_PROTECTED_FALLBACK_PAGE_URI, useValue: '/painel'},
        {provide: W3_PUBLIC_FALLBACK_PAGE_URI, useValue: '/auth/login'},



import into app.module.ts

W3Module.forRoot(),
W3AuthModule,



# Extend
è possivel customer o service auth criando um extend de `W3AuthAbstractService`,
apos criar o service, é necessario injecar ele no provider com token  `W3_AUTH_SERVICE`.

```js
export class MyAuthService extends W3AuthAbstractService {

   //....
}
```