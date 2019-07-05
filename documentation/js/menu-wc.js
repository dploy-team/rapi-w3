'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">rapi-w3 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/W3AclModule.html" data-type="entity-link">W3AclModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-W3AclModule-b1baa1cc9525b728a7eb4a497c63c2f5"' : 'data-target="#xs-directives-links-module-W3AclModule-b1baa1cc9525b728a7eb4a497c63c2f5"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-W3AclModule-b1baa1cc9525b728a7eb4a497c63c2f5"' :
                                        'id="xs-directives-links-module-W3AclModule-b1baa1cc9525b728a7eb4a497c63c2f5"' }>
                                        <li class="link">
                                            <a href="directives/W3AclCanDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">W3AclCanDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/W3AuthModule.html" data-type="entity-link">W3AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-W3AuthModule-06aad355d7872d0140ef73206783b9b1"' : 'data-target="#xs-injectables-links-module-W3AuthModule-06aad355d7872d0140ef73206783b9b1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-W3AuthModule-06aad355d7872d0140ef73206783b9b1"' :
                                        'id="xs-injectables-links-module-W3AuthModule-06aad355d7872d0140ef73206783b9b1"' }>
                                        <li class="link">
                                            <a href="injectables/W3MeService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>W3MeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/W3Module.html" data-type="entity-link">W3Module</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-W3Module-ff6886d2ac66a5e4d306eecccb657c0b"' : 'data-target="#xs-components-links-module-W3Module-ff6886d2ac66a5e4d306eecccb657c0b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-W3Module-ff6886d2ac66a5e4d306eecccb657c0b"' :
                                            'id="xs-components-links-module-W3Module-ff6886d2ac66a5e4d306eecccb657c0b"' }>
                                            <li class="link">
                                                <a href="components/W3PaginatorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">W3PaginatorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-W3Module-ff6886d2ac66a5e4d306eecccb657c0b"' : 'data-target="#xs-pipes-links-module-W3Module-ff6886d2ac66a5e4d306eecccb657c0b"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-W3Module-ff6886d2ac66a5e4d306eecccb657c0b"' :
                                            'id="xs-pipes-links-module-W3Module-ff6886d2ac66a5e4d306eecccb657c0b"' }>
                                            <li class="link">
                                                <a href="pipes/W3PhonePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">W3PhonePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/W3WeekDayPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">W3WeekDayPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/W3NotificationModule.html" data-type="entity-link">W3NotificationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-W3NotificationModule-31232e5729afd409b4528515a24623d6"' : 'data-target="#xs-components-links-module-W3NotificationModule-31232e5729afd409b4528515a24623d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-W3NotificationModule-31232e5729afd409b4528515a24623d6"' :
                                            'id="xs-components-links-module-W3NotificationModule-31232e5729afd409b4528515a24623d6"' }>
                                            <li class="link">
                                                <a href="components/W3MatConfirmDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">W3MatConfirmDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-W3NotificationModule-31232e5729afd409b4528515a24623d6"' : 'data-target="#xs-injectables-links-module-W3NotificationModule-31232e5729afd409b4528515a24623d6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-W3NotificationModule-31232e5729afd409b4528515a24623d6"' :
                                        'id="xs-injectables-links-module-W3NotificationModule-31232e5729afd409b4528515a24623d6"' }>
                                        <li class="link">
                                            <a href="injectables/W3NotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>W3NotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WebSocketModule.html" data-type="entity-link">WebSocketModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-WebSocketModule-73a6274085f14ff11bb0925a2d2696c4"' : 'data-target="#xs-injectables-links-module-WebSocketModule-73a6274085f14ff11bb0925a2d2696c4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WebSocketModule-73a6274085f14ff11bb0925a2d2696c4"' :
                                        'id="xs-injectables-links-module-WebSocketModule-73a6274085f14ff11bb0925a2d2696c4"' }>
                                        <li class="link">
                                            <a href="injectables/W3WebSocketService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>W3WebSocketService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/W3PaginatorComponent.html" data-type="entity-link">W3PaginatorComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AbstractSearchParams.html" data-type="entity-link">AbstractSearchParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/MyHttpErrorResponse.html" data-type="entity-link">MyHttpErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValueAccessorBase.html" data-type="entity-link">ValueAccessorBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/W3AuthAbstractService.html" data-type="entity-link">W3AuthAbstractService</a>
                            </li>
                            <li class="link">
                                <a href="classes/W3MessagesBaseResponseService.html" data-type="entity-link">W3MessagesBaseResponseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/W3Notification.html" data-type="entity-link">W3Notification</a>
                            </li>
                            <li class="link">
                                <a href="classes/W3StorageOption.html" data-type="entity-link">W3StorageOption</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/W3AbstractRequestService.html" data-type="entity-link">W3AbstractRequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/W3AclService.html" data-type="entity-link">W3AclService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/W3AuthService.html" data-type="entity-link">W3AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/W3MessagesLv55ResponseService.html" data-type="entity-link">W3MessagesLv55ResponseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/W3MessagesLv56ResponseService.html" data-type="entity-link">W3MessagesLv56ResponseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/W3RequestAclService.html" data-type="entity-link">W3RequestAclService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/W3StorageService.html" data-type="entity-link">W3StorageService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/W3ApiToastInterceptor.html" data-type="entity-link">W3ApiToastInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/W3AuthInterceptor.html" data-type="entity-link">W3AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/W3AclCanGuard.html" data-type="entity-link">W3AclCanGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/W3ProtectedGuard.html" data-type="entity-link">W3ProtectedGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/W3PublicGuard.html" data-type="entity-link">W3PublicGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CollectionResponse.html" data-type="entity-link">CollectionResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataAclModel.html" data-type="entity-link">DataAclModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataObj.html" data-type="entity-link">DataObj</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataUpload.html" data-type="entity-link">DataUpload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EnumItem.html" data-type="entity-link">EnumItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Error.html" data-type="entity-link">Error</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileReaderEvent.html" data-type="entity-link">FileReaderEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileReaderEventTarget.html" data-type="entity-link">FileReaderEventTarget</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HttpPostOptions.html" data-type="entity-link">HttpPostOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemRespDec.html" data-type="entity-link">ItemRespDec</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemResponse.html" data-type="entity-link">ItemResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemUploadResponse.html" data-type="entity-link">ItemUploadResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessagesResponse.html" data-type="entity-link">MessagesResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permission.html" data-type="entity-link">Permission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response20x.html" data-type="entity-link">Response20x</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response40x.html" data-type="entity-link">Response40x</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseAclData.html" data-type="entity-link">ResponseAclData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseCollection.html" data-type="entity-link">ResponseCollection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResponseItem.html" data-type="entity-link">ResponseItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Role.html" data-type="entity-link">Role</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SwChannel.html" data-type="entity-link">SwChannel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SwInChannel.html" data-type="entity-link">SwInChannel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserModel.html" data-type="entity-link">UserModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/W3Config.html" data-type="entity-link">W3Config</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/W3ConfirmResponse.html" data-type="entity-link">W3ConfirmResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/W3MetaPagination.html" data-type="entity-link">W3MetaPagination</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#pipes-links"' :
                                'data-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/W3PhonePipe.html" data-type="entity-link">W3PhonePipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/W3WeekDayPipe.html" data-type="entity-link">W3WeekDayPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});