# Provider example
Very simple data provider showing the concept.

The Data provider in this example is written in javascript using Node.js. However Data providers can be written in any language supporting REST API:s.

## Getting started
Start the provider:
1. Put the Data provider folder on a server that Sectra Healthcare Server can reach
2. Open a command prompt in the folder and execute <em>npm install</em>
3. execute <em>node DataProvider.js</em>

Build the template:
See the build instructions in the readme in StructuredReportingTemplatesDevResources root folder.

Import the template to Sectra IDS7:
1. Open the Structured Report Template Administration
2. Navigate to the Data Providers tab
3. Add a new Data Provider named SimpleProvider with the url <em><url to the server containing DataProvider.js>:3000</em>
4. Click apply
5. Import the index.html located in the dist folder.
