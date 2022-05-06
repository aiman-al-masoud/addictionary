rm ./dist/index.html
cp ./app/src/index.html ./dist/
webpack 
echo "<script>" >> ./dist/index.html  
cat ./dist/index.js >> ./dist/index.html  
echo "</script>" >> ./dist/index.html  
sed -i 's/<script defer="defer" src="bundle.js">//g' ./dist/index.html   
rm ./dist/index.js