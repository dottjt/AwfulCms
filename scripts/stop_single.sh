#!/bin/bash

# example 
# sh link.sh production ac

### PRODUCTION

if [ "$1" == "production" ] ; then 

    PID="$(pgrep -f name=${2}_prod)"
    
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
  # NAME="$2"

  # # Kill the Erlang process corresponding to a given node name
  # port=`epmd -names | awk -v name=$NAME '$2==name {print $5}'`

  # echo $port

  # if [ -z "$port" ]; then
  #   echo "ERROR: Node name not found: $NAME"
  #   exit 1
  # else
  #   pid=`lsof -i TCP:$port -s TCP:LISTEN | tail -n +2 | awk '{print $2}'`
  #   kill $pid
  #   exit 0
  # fi

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

    PID="$(pgrep -f name=${2}_dev)"
    
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
  # NAME=${2}_dev

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

fi 



