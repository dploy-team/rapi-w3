#!/bin/bash

###############################################################################
#                                                                             #
#   NPM Deployer                                                              #
#                                                                             #
###############################################################################

DistDir='/home/wagner/Documents/projects/rapi-w3/dist/w3'
Dir='/home/wagner/Documents/projects/rapi-w3/projects/w3'


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
    cd $Dir
    npm version major
    ng build w3
    cd $DistDir
    npm publish
}
Minor(){
    cd $Dir
    npm version minor
    ng build w3
    cd $DistDir
    npm publish
}
Patch(){
    cd $Dir
    npm version patch
    ng build w3
    cd $DistDir
    npm publish
}

Init $1