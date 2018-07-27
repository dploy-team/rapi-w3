

COnfigure AUTH


        {provide: W3_AUTH_SERVICE, useClass: AuthService},
        {provide: W3_PROTECTED_FALLBACK_PAGE_URI, useValue: '/painel'},
        {provide: W3_PUBLIC_FALLBACK_PAGE_URI, useValue: '/auth/login'},



import into app.module.ts

W3Module.forRoot(),
W3AuthModule,        