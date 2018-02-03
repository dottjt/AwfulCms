#!/bin/bash
# try on template_symbolic

# example 
# sh link.sh ac

declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

# rm -rf websites

for i in "${arr[@]}"
do
	cd $AWFUL_DIR/development/"$i"/
	mix deps.get
	mix compile

	cd $AWFUL_DIR/development/"$i"/assets
  npm install --save https://github.com/brunch/sass-brunch.git
  npm run deploy
done


