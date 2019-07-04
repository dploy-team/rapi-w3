#!/bin/bash

###############################################################################
#                                                                             #
#   NPM Deployer                                                              #
#                                                                             #
###############################################################################

DistDir='/home/wagner/Documents/projects/rapi-w3/dist/rapi-e3'


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
    cd $DistDir
    npm version major
    npm publish
}
Minor(){
    cd $DistDir
    npm version minor
    npm publish
}
Patch(){
    cd $DistDir
    npm version patch
    npm publish
}

Init $1