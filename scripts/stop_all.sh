#!/bin/bash

# example 
# sh link.sh production ac

# They are both the same. 

declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

### PRODUCTION

if [ "$1" == "production" ] ; then 

  for i in "${arr[@]}"

    PID="$(pgrep -f name=${i}_prod)"
    
    echo $PID

    if [[ ! -z "$PID" ]]; then # will return true if variable is set. 

      kill $PID 
      
    else 

      echo "no server to kill"

    fi 
  
    # if [ -z "$1" ]; then
    #   echo "Usage: `basename $0` NODE_NAME"
    #   exit 1
    # fi

    # # Fetch input parameters
    # NAME="$1"

    # # Kill the Erlang process corresponding to a given node name
    # port=`epmd -names | awk -v name=$NAME '$2==name {print $5}'`
    # if [ -z "$port" ]; then
    #   echo "ERROR: Node name not found: $NAME"
    #   exit 1
    # else
    #   pid=`lsof -i TCP:$port -s TCP:LISTEN | tail -n +2 | awk '{print $2}'`
    #   kill $pid
    #   exit 0
    # fi

  done

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

  for i in "${arr[@]}"

    PID="$(pgrep -f name=${i}_dev)"
    
    echo $PID

    if [[ ! -z "$PID" ]]; then # will return true if variable is set. 

      kill $PID 
      
    else 

      echo "no server to kill"

    fi 

    # if [ -z "$1" ]; then
    #   echo "Usage: `basename $0` NODE_NAME"
    #   exit 1
    # fi

    # # Fetch input parameters
    # NAME="${1}_dev"

    # # Kill the Erlang process corresponding to a given node name
    # port=`epmd -names | awk -v name=$NAME '$2==name {print $5}'`
    # if [ -z "$port" ]; then
    #   echo "ERROR: Node name not found: $NAME"
    #   exit 1
    # else
    #   pid=`lsof -i TCP:$port -s TCP:LISTEN | tail -n +2 | awk '{print $2}'`
    #   kill $pid
    #   exit 0
    # fi

  done 
  
fi 



