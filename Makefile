GIT_PORCELAIN_STATUS=$(shell git status --porcelain)
VERSION=$(shell head -1 VERSION)

build: clean
	mkdir dist
	yui-compressor src/leaflet-clicks.js > "dist/leaflet-clicks-$(VERSION).js"
clean:
	rm -Rf dist
get-leaflet-dist:
	# Will retrieve leaflet files if needed:
	mkdir -p examples/images
	test -f examples/leaflet.css || wget http://leafletjs.com/dist/leaflet.css -O examples/leaflet.css
	test -f examples/leaflet.js || wget http://leafletjs.com/dist/leaflet.js -O examples/leaflet.js
	test -f examples/images/marker-shadow.png || wget http://leafletjs.com/dist/images/marker-shadow.png -O examples/images/marker-shadow.png
	test -f examples/images/marker-icon.png || wget http://leafletjs.com/dist/images/marker-icon.png -O examples/images/marker-icon.png
show-chromium: get-leaflet-dist
	chromium-browser examples/index.html
show-firefox: get-leaflet-dist
	firefox examples/index.html
github-pages: check-all-commited
	git branch -D gh-pages
	git checkout -b gh-pages
	rm .gitignore
	cp examples/* .
	git add .
	git commit -m "gh-pages"
	git checkout master
	git clean -f
	git checkout -- .
check-all-commited:
	if [ -n "$(GIT_PORCELAIN_STATUS)" ]; \
	then \
	    echo 'YOU HAVE UNCOMMITED CHANGES'; \
	    git status; \
	    exit 1; \
	fi
