#!/bin/bash

# example 
# sh link.sh production ac 

declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")


### PRODUCTION

if [ "$1" == "production" ]; then 
  
  for i in "${arr[@]}"
  do
    
    PID="$(pgrep -f name=${i}_prod)"

    # echo $PID
    
    if [[ ! -z "$PID" ]]; then # will return true if variable is set. 

      if [[ "$i" == "ac" ]]; then
        
        printf ' [ { "status": true,  "acronym": "%s" }' $i     

      else 

        printf ', { "status": true,  "acronym": "%s" } ' $i     

      fi 

    else 

      if [[ "$i" == "ac" ]]; then
        
        printf '[ { "status": false, "acronym": "%s" } ' $i      
    
      else

        printf ', { "status": false, "acronym": "%s" } ' $i   
      
      fi

    fi 

  done


  #   NAME_CHECK=`epmd -names | awk -v name=${2} '$2==name {print $2}'`
    
  #   EPMD=`epmd -names`

  #   # echo $NAME_CHECK

  #   if [[ $EPMD =~ "$i" ]]; then

  #     if [[ "$i" == "ac" ]]; then
        
  #       printf ' [ { "status": true,  "acronym": "%s" }' $i     

  #     else 

  #       printf ', { "status": true,  "acronym": "%s" } ' $i     

  #     fi 

  #   else 

  #     if [[ "$i" == "ac" ]]; then
        
  #       printf '[ { "status": false, "acronym": "%s" } ' $i      
    
  #     else

  #       printf ', { "status": false, "acronym": "%s" } ' $i   
      
  #     fi

  #   fi 

  # done

fi 








### DEVELOPMENT

if [ "$1" == "development" ]; then 
  
  for i in "${arr[@]}"
  do

    PID="$(pgrep -f name=${i}_dev)"
    
    # echo $PID

    if [[ ! -z "$PID" ]]; then # will return true if variable is set. 

      if [[ "$i" == "ac" ]]; then
        
        printf ' [ { "status": true,  "acronym": "%s" }' $i     

      else 

        printf ', { "status": true,  "acronym": "%s" } ' $i     

      fi 

    else 

      if [[ "$i" == "ac" ]]; then
        
        printf '[ { "status": false, "acronym": "%s" } ' $i      
    
      else

        printf ', { "status": false, "acronym": "%s" } ' $i   
      
      fi

    fi 

  done

  #   NAME_CHECK=`epmd -names | awk -v name=${2}_dev '$2==name {print $2}'`

  #   # `epmd -names | awk -F'[,]
    
  #   EPMD=`epmd -names`

  #   # echo $NAME_CHECK

  #   if [[ $EPMD =~ "$i" ]]; then

  #     if [[ "$i" == "ac" ]]; then
        
  #       printf ' [ { "status": true,  "acronym": "%s" }' $i     

  #     else 

  #       printf ', { "status": true,  "acronym": "%s" } ' $i     

  #     fi 

  #   else 

  #     if [[ "$i" == "ac" ]]; then
        
  #       printf '[ { "status": false, "acronym": "%s" } ' $i      
    
  #     else

  #       printf ', { "status": false, "acronym": "%s" } ' $i   
      
  #     fi

  #   fi 

  # done

fi 



# ### DEVELOPMENT

# if [ "$1" == "development" ]; then 
  
#   for i in "${arr[@]}"
#   do

#     NAME_CHECK=`epmd -names | awk -v name=${1}_dev '$2==name {print $2}'`

#     if [[ $NAME_CHECK == "$i" ]]; then

#       if [[ "$i" == "ac" ]]; then
        
#         printf ' [ { "%s": true ' $i     

#       else 

#         printf ', "%s": true ' $i     

#       fi 

#     else 

#       if [[ "$i" == "ac" ]]; then
        
#         printf '[ { "%s": false ' $i     
    
#       else

#         printf ', "%s": false ' $i   
      
#       fi

#     fi 

#   done

# fi 



