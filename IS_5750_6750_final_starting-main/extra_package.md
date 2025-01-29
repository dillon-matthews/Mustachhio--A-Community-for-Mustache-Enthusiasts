I implemented an npm package called 'check-is-deprecated'. There are some built in features to check if npm packages are deprecated, but I've found that on occasion things are missed, so this is great tool to make sure everything is good to go.

npm install -g check-is-deprecated | (to install)

check-is-deprecated -f | (this fetches the package list from package.json and outputs a list of deprecated packages if any.)

Example output:

C:\Users\dillo\> check-is-deprecated -f
🎉 All is OK!
