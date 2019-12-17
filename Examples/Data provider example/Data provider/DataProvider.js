const express = require('express');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Setup basic http auth
/*
app.use(basicAuth({
    users: { 'admin': 'super' }
}))
*/

app.post('/v1/getstructureddata/', function(req, res) {
    
	// The following objects can be used to identify current Patient/User/Examination
    // var patient = req.body.patient; (contains {ids: string[]})
	// var user = req.body.user; (contains {login: string, domain: string, name: string})
	// var exam = req.body.exam; (contains {examNo: string, accNo: string, studyUid: string, date: string})
    console.log("Got call");
	
	// The following result will be sent to the template.
    var result = {cancerSize: 81, cancerMalignity: "Malign", followUp: "Exam 3"};
	
	// Compability information. If a template specifies compability information, it must match this.
	// Make sure to use a unique id for each data provider.
    var compatibility = {Uid: "unique-template-id", Version: 1};

    res.send({Compatibility: compatibility, PropValues: result});

    // To send error
    /*
    res.statusMessage = "ERROR";
    res.status(500).end();
    */
});

app.get('/v1/getStructuredDataCompability', (req, res) => res.send({Uid: "unique-template-id", Version: 1}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));