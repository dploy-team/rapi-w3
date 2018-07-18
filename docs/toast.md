

npm install ngx-toastr --save




### app.modules.ts


```js

    imports: [
        //...        
        ToastrModule.forRoot(W3ConfigToast),
    ],
    providers: [
        {provide: W3_MESSAGE_RESPONSE, useClass: W3MessagesLv55ResponseService},
        {provide: HTTP_INTERCEPTORS, useClass: W3ApiToastInterceptor, multi: true}
    ]
 
 
```  

### styles.scss

```scss
// Import Fuse core library
@import "@fuse/scss/core";
@import "~ngx-toastr/toastr.css";
```
