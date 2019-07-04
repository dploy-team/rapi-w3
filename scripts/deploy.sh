#!/bin/bash

###############################################################################
#                                                                             #
#   NPM Deployer                                                              #
#                                                                             #
###############################################################################




#============================

Init(){
    case $1 in 
        --major|--mj) Major ;;
        --minor|--mn) Minor ;;
        --patch|--pt) Patch ;;
        *) echo "Erro: Informe o nivel da atualização (Major|Minor|Patch)"; echo; exit ;;
    esac
}

Major(){
    npm version major
    npm publish
}
Minor(){
    npm version minor
    npm publish
}
Patch(){
    npm version patch
    npm publish
}

Init $1