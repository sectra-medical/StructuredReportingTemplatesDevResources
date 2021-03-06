
# This readme are written for Sectra personell that are about to contribute to the Development components.
## Build
Use npm to build the package.

```
npm install
npm run build
```

## Creating a new component
To create a new component you will need the following things
1. The component file it self
2. Add the component props and create the module in index.d.ts (each component have 3 blocks each, copy-paste these 3 blocks and modify)
3. Export the component in src/index.ts

## Test before publish
0. (If you created a component) Use the component in Test.tsx 
1. Run "npm run testbuild"
2. Open index.html in the test-build folder

## Publish
You need an user at npm with rights to contribute to the package.
I.e. npm adduser

After publishing, please update the @sectra/srt-components version in [cra-template-srt](https://gitlab.sectra.net/LocalDevSe/cra-template-srt) package.json file.
(If you added a new component, its nice if you also add a demo of it in the cra-template-srt)

(Note that after publishing you will have to update the version of @sectra/srt-components in package.json in all projects that should use the new version, and then run npm install)

### Release
0.1 Push all changes
0.2 Merge all changes to master
0.3 run 'npm version to' see the current version
1. run "npm run build" to build your changes
2. run 'npm version <major.minor.patch> -m"Increment npm version to %s"' where you replace <major.minor.patch> with the new version number.
3. Check if tags where created for you, otherwise run 'git tag -a @sectra/srt-components@v<major.minor.patch>'
4. run "git push && git push --tags"
5. run 'npm publish'

### Alpha
0. run 'npm version' to see the current version
1. run 'npm run build' to build your changes
2. run 'npm version <major.minor.patch>-alpha.<x> where you replace <major.minor.patch> with the new upcoming release and <x> with the alpha release number beginning with 1. (for example: you are developing something that will be version 2.3.4, then start with 2.3.4-alpha.1 and then update the alpha release number with each publish)
3. run 'npm publish' --tag next
