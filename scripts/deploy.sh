#!/bin/bash

###############################################################################
#                                                                             #
#   NPM Deployer                                                              #
#                                                                             #
###############################################################################

DistDir='/home/wagner/Documents/projects/rapi-w3/dist/w3'


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
    ng build w3
    cd $DistDir
    npm publish
}
Minor(){
    npm version minor
    ng build w3
    cd $DistDir
    npm publish
}
Patch(){
    npm version patch
    ng build w3
    cd $DistDir
    npm publish
}

Init $1