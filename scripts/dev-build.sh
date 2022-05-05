webpack --mode=development
echo "<script>" >> ./dist/index.html  
cat ./dist/index.js >> ./dist/index.html  
echo "</script>" >> ./dist/index.html  
sed -i 's/<script defer="defer" src="bundle.js">//g' ./dist/index.html   
rm ./dist/index.js