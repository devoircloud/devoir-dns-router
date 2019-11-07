const express = require('express');

const router = express.Router();

const Todo = require('../models/todo');
const Utils = require('../helpers/utils');

const expressip = require('express-ip');
const geoip = require('geoip-lite');

const continents = {"BD": "AS", "BE": "EU", "BF": "AF", "BG": "EU", "BA": "EU", "BB": "NA", "WF": "OC", "BL": "NA", "BM": "NA", "BN": "AS", "BO": "SA", "BH": "AS", "BI": "AF", "BJ": "AF", "BT": "AS", "JM": "NA", "BV": "AN", "BW": "AF", "WS": "OC", "BQ": "NA", "BR": "SA", "BS": "NA", "JE": "EU", "BY": "EU", "BZ": "NA", "RU": "EU", "RW": "AF", "RS": "EU", "TL": "OC", "RE": "AF", "TM": "AS", "TJ": "AS", "RO": "EU", "TK": "OC", "GW": "AF", "GU": "OC", "GT": "NA", "GS": "AN", "GR": "EU", "GQ": "AF", "GP": "NA", "JP": "AS", "GY": "SA", "GG": "EU", "GF": "SA", "GE": "AS", "GD": "NA", "GB": "EU", "GA": "AF", "SV": "NA", "GN": "AF", "GM": "AF", "GL": "NA", "GI": "EU", "GH": "AF", "OM": "AS", "TN": "AF", "JO": "AS", "HR": "EU", "HT": "NA", "HU": "EU", "HK": "AS", "HN": "NA", "HM": "AN", "VE": "SA", "PR": "NA", "PS": "AS", "PW": "OC", "PT": "EU", "SJ": "EU", "PY": "SA", "IQ": "AS", "PA": "NA", "PF": "OC", "PG": "OC", "PE": "SA", "PK": "AS", "PH": "AS", "PN": "OC", "PL": "EU", "PM": "NA", "ZM": "AF", "EH": "AF", "EE": "EU", "EG": "AF", "ZA": "AF", "EC": "SA", "IT": "EU", "VN": "AS", "SB": "OC", "ET": "AF", "SO": "AF", "ZW": "AF", "SA": "AS", "ES": "EU", "ER": "AF", "ME": "EU", "MD": "EU", "MG": "AF", "MF": "NA", "MA": "AF", "MC": "EU", "UZ": "AS", "MM": "AS", "ML": "AF", "MO": "AS", "MN": "AS", "MH": "OC", "MK": "EU", "MU": "AF", "MT": "EU", "MW": "AF", "MV": "AS", "MQ": "NA", "MP": "OC", "MS": "NA", "MR": "AF", "IM": "EU", "UG": "AF", "TZ": "AF", "MY": "AS", "MX": "NA", "IL": "AS", "FR": "EU", "IO": "AS", "SH": "AF", "FI": "EU", "FJ": "OC", "FK": "SA", "FM": "OC", "FO": "EU", "NI": "NA", "NL": "EU", "NO": "EU", "NA": "AF", "VU": "OC", "NC": "OC", "NE": "AF", "NF": "OC", "NG": "AF", "NZ": "OC", "NP": "AS", "NR": "OC", "NU": "OC", "CK": "OC", "XK": "EU", "CI": "AF", "CH": "EU", "CO": "SA", "CN": "AS", "CM": "AF", "CL": "SA", "CC": "AS", "CA": "NA", "CG": "AF", "CF": "AF", "CD": "AF", "CZ": "EU", "CY": "EU", "CX": "AS", "CR": "NA", "CW": "NA", "CV": "AF", "CU": "NA", "SZ": "AF", "SY": "AS", "SX": "NA", "KG": "AS", "KE": "AF", "SS": "AF", "SR": "SA", "KI": "OC", "KH": "AS", "KN": "NA", "KM": "AF", "ST": "AF", "SK": "EU", "KR": "AS", "SI": "EU", "KP": "AS", "KW": "AS", "SN": "AF", "SM": "EU", "SL": "AF", "SC": "AF", "KZ": "AS", "KY": "NA", "SG": "AS", "SE": "EU", "SD": "AF", "DO": "NA", "DM": "NA", "DJ": "AF", "DK": "EU", "VG": "NA", "DE": "EU", "YE": "AS", "DZ": "AF", "US": "NA", "UY": "SA", "YT": "AF", "UM": "OC", "LB": "AS", "LC": "NA", "LA": "AS", "TV": "OC", "TW": "AS", "TT": "NA", "TR": "AS", "LK": "AS", "LI": "EU", "LV": "EU", "TO": "OC", "LT": "EU", "LU": "EU", "LR": "AF", "LS": "AF", "TH": "AS", "TF": "AN", "TG": "AF", "TD": "AF", "TC": "NA", "LY": "AF", "VA": "EU", "VC": "NA", "AE": "AS", "AD": "EU", "AG": "NA", "AF": "AS", "AI": "NA", "VI": "NA", "IS": "EU", "IR": "AS", "AM": "AS", "AL": "EU", "AO": "AF", "AQ": "AN", "AS": "OC", "AR": "SA", "AU": "OC", "AT": "EU", "AW": "NA", "IN": "AS", "AX": "EU", "AZ": "AS", "IE": "EU", "ID": "AS", "UA": "EU", "QA": "AS", "MZ": "AF"};

// get current ip
router.get('/showip', (req, res, next) => {
  // generate a new name
  const name = Utils.randomString(5);

  // new todo model
  const newTodo = new Todo({ name, done: false });

  newTodo.save()
    .then((todo) => { console.log(`Success! ${todo.name} saved! \n${todo}`); })
    .catch((err) => { console.log(err); });

  if (req.ipInfo.error) {
  	console.log("Can not get IP address. Probably you are running on localhost");
  }

  res.render('index', { title: 'Express' });
});


// get current location
router.get('/showlocation', (req, res, next) => {
  // generate a new name
  var ip = "207.97.227.239";

  var geo = geoip.lookup(ip);

  console.log(geo);

  res.render('index', { title: 'Express' });
});


// get server id by location
router.get('/show-server-id', (req, res, next) => {
  // generate a new name
  var ip = "207.97.227.239";

  var geo = geoip.lookup(ip);

  var continent = continents[geo.country];

  // server id
  var id = 0;
  // africe, antractica and europe belong to server 1
  if ('AF' == continent || 'AN' == continent || 'EU' == continent) {
  	id = 1;
  }
  // asia and oceania belong to server 2
  else if ('AS' == continent || 'OC' == continent) {
  	id = 2;
  }
  else if ('NA' == continent || 'SA' == continent) {
  	id = 3;
  }
  if (id) {
  	console.log("Server where user should be redirected: "+id);
  }

  res.render('index', { title: 'Express' });
});

// redirect to the server
router.get('/redirect-to-server', (req, res, next) => {
  // generate a new name
  var ip = "207.97.227.239";

  var geo = geoip.lookup(ip);

  var continent = continents[geo.country];

  // server id
  var id = 0;
  // africe, antractica and europe belong to server 1
  if ('AF' == continent || 'AN' == continent || 'EU' == continent) {
  	id = 1;
  }
  // asia and oceania belong to server 2
  else if ('AS' == continent || 'OC' == continent) {
  	id = 2;
  }
  else if ('NA' == continent || 'SA' == continent) {
  	id = 3;
  }
  if (id) {
  	console.log("Server where user should be redirected: "+id);
  	res.redirect('http://localhost:7001/test/server/'+id);
  }
  else {
  	res.render('index', { title: 'Express' });
  }
});

// get the temporary servers as a hosting provider
router.get('/server/:id/:optional*?', (req, res, next) => {
  if ( req.params.id < 1 || req.params.id > 3) {
  	  res.status(403).send('Error 403! Unsupported server id');
  }
  else {
	console.log("Requested URL: "+req.originalUrl);
  }
  // generate a new name
  console.log("Requested the server "+req.params.id);
  
  res.render('index', { title: 'Express' });
});

// redirect from subdomain
router.get('/:subdomain/*?', (req, res, next) => {
  // generate a new name
  var ip = "207.97.227.239";

  var geo = geoip.lookup(ip);

  var continent = continents[geo.country];

  // server id
  var id = 0;
  // africe, antractica and europe belong to server 1
  if ('AF' == continent || 'AN' == continent || 'EU' == continent) {
  	id = 1;
  }
  // asia and oceania belong to server 2
  else if ('AS' == continent || 'OC' == continent) {
  	id = 2;
  }
  else if ('NA' == continent || 'SA' == continent) {
  	id = 3;
  }
  if (id) {
    const params = req.path.substring(req.params.subdomain.length+1); // length + 1, count the slash
  	// const params = req.path.substring(req.params.subdomain.length); // length + 1, count the slash
    // console.log(req.params);
  	// console.log(params);
  	// console.log("\n\n\n\n\n"+req.params.subdomain+"\n\n\n\n\n\n");
  	// console.log("Server where user should be redirected: "+id);
    // res.redirect('http://localhost:7001/test/server/'+id+""+params);
  	res.redirect('http://localhost:7005/'+req.params.subdomain+params);
  }
  else {
  	res.render('index', { title: 'Express' });
  }
});


module.exports = router;
