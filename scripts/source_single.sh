#!/bin/bash

# example 
# sh link.sh production ac

# They are both the same. 

### PRODUCTION

if [ "$1" == "production" ] ; then 

    source $AWFUL_DIR/shared/env/${2}/.${2}_env  

  done

    source $AWFUL_DIR/shared/env/${2}/.env  
    source $AWFUL_DIR/manager/.env  

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

    echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

fi 



