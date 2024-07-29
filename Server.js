var express = require("express");
var mysql = require("mysql");
var fileupload = require("express-fileupload");

var dbconfiguration = {
    host: "localhost",
    user: "root",
    password: "",
    database: "medcare"
}

var app = express();
app.listen(8000, function () {
    console.log("server started.....");
})
app.use(express.static("public"));

//=============================INDEX PAGE=====================================
app.get("/", function (req, resp) {
    var path = __dirname + "/Public/index.html";
    resp.sendFile(path);
})

//=============================SIGN UP PAGE==================================
app.get("/signup", function (req, resp) {
    var path = process.cwd() + "/Public/signup.html";
    resp.sendFile(path);
})

//=================================LOG IN PAGE===============================
app.get("/Login", function (req, resp) {
    var path = process.cwd() + "/Public/Login.html";
    resp.sendFile(path);
})
app.use(express.urlencoded({ extended: true }));

//==================================SIGN UP SECURE===========================
app.post("/signup-process-post", function (req, resp) {
    console.log(req.body);

    var { nEmail, nPwd } = req.body;

    resp.send("Welcme:" + nEmail + "<br>Password=" + nPwd);
})

//===============================ANGULAR====================================
app.get("/angular", function (req, resp) {
    var Path = process.cwd() + "/Public/angular.html";
    resp.sendFile(Path);
})
//app.get("/signup-process", function (req, resp) {
//

//    console.log(req.query);


//    var { n, p, u } = req.query;
//    resp.send("Signed up successfully!!!");
//})


//app.get("/login-process", function (req, resp) {


//    console.log(req.query);


//    var { n, p } = req.query;
//    resp.send("Logged in successfully!!!");
//})

var refdb = mysql.createConnection(dbconfiguration);
refdb.connect(function (errorr) {
    if (errorr) {
        console.log(errorr);
    }
    else
        console.log("connected to server");
})

// app.get("/signup-process", function (req, resp) {


//     console.log(req.query);


//     var { n, p, u } = req.query;
//     var arydata = [n, p, u];
//     refdb.query("insert into tb1 values(?,?,?,current_date())", arydata, function (errorr) {
//         if (errorr) {
//             resp.send(errorr.toString());
//         }
//         else {
//             resp.send("saved successfully");
//         }
//     })

//})
app.get("/login-process", function (req, resp) {


    console.log(req.query);


    var { n, p } = req.query;
    var ary = [n, p];
    refdb.query("select * from donor where email=? and password=?", ary, function (errorr, tableJSON) {
        if (errorr)
            resp.send(errorr.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);


    });

})
// ===========================================================
app.get("/login-process-needer", function (req, resp) {


    console.log(req.query);


    var { nm, pq } = req.query;
    var ary = [nm, pq];
    refdb.query("select * from receiver where email=? and password=?", ary, function (errorr, tableJSON) {
        if (errorr)
            resp.send(errorr.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);


    });

})
// ===========================================================
app.get("/CheckDatainTable", function (req, resp) {
    console.log(req.query);
    var { emails, password } = req.query;
    var aryLogin = [emails, password];
    refdb.query("select * from donor where email=? and password=?", aryLogin, function (errorr, tableJSON) {
        if (errorr) {
            resp.send(errorr.toString());
        }
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    })
})
app.get("/update-password", function (req, resp) {
    console.log(req.query);
    var { emails, newpassword, oldpassword } = req.query;
    var ary = [newpassword, emails, oldpassword];
    refdb.query("update donor set password=? where email=? and password=?", ary, function (errorr) {
        if (errorr) {
            resp.send(errorr.toString());

        }
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    })
})

app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.post("/provider-profile", function (req, resp) {

    var { fname, lname, nEmail, nPwd, address, city, nmbr, idprf, time } = req.body;
    var fileName = nEmail + "_" + req.files.profilePic.name;
    var fileName1 = nEmail + "_" + req.files.proofPic.name;
    var desPath = process.cwd() + "/Public/uploads/" + fileName;
    req.files.profilePic.mv(desPath);
    var desPath1 = process.cwd() + "/Public/uploads/" + fileName1;
    req.files.proofPic.mv(desPath1);

    var ary = [fname, lname, nEmail, nPwd, address, city, nmbr, idprf, time, fileName, fileName1];
    console.log(ary);
    refdb.query("insert into donor values(?,?,?,?,?,?,?,?,?,?,?)", ary, function (errorr) {
        if (errorr)
            resp.send(errorr.toString());
        else
        var path = process.cwd() + "/Public/welcome-provider.html";
        resp.sendFile(path);
            
    })
})
app.post("/needer-profile", function (req, resp) {

    var { fname, lname, nEmail, nPwd, address, city, nmbr, idprf } = req.body;
    var fileName1 = nEmail + "_" + req.files.profilePic.name;
    var fileName2 = nEmail + "_" + req.files.proofPic.name;
    var desPath = process.cwd() + "/Public/uploads2/" + fileName1;
    req.files.profilePic.mv(desPath);
    var desPath1 = process.cwd() + "/Public/uploads2/" + fileName2;
    req.files.proofPic.mv(desPath1);

    var ary = [fname, lname, nEmail, nPwd, address, city, nmbr, idprf, fileName1, fileName2];
    console.log(ary);
    refdb.query("insert into receiver values(?,?,?,?,?,?,?,?,?,?)", ary, function (errorr) {
        if (errorr)
            resp.send(errorr.toString());
        else
        var path = process.cwd() + "/Public/welcome-needer.html";
        resp.sendFile(path);
    })
})
app.post("/profile-update", function (req, resp) {

    var { fname, lname, nEmail, nPwd, address, city, nmbr, idprf, time } = req.body;
    var fileName = nEmail + "_" + req.files.profilePic.name;
    var fileName1 = nEmail + "_" + req.files.proofPic.name;
    var desPath = process.cwd() + "/Public/uploads/" + fileName;
    req.files.profilePic.mv(desPath);
    var desPath1 = process.cwd() + "/Public/uploads/" + fileName1;
    req.files.proofPic.mv(desPath1);

    var ary = [fname, lname, nPwd, address, city, nmbr, idprf, time, fileName, fileName1, nEmail];
    console.log(ary);
    refdb.query("update donor set firstname=?, lastname=?, password=?, address=?, city=?, contact=?, idproof=?, time=?, filename=?, filename1=? where email=?", ary, function (errorr) {
        if (errorr)
            resp.send(errorr.toString());
        else
        var path = process.cwd() + "/Public/welcome-provider.html";
        resp.sendFile(path);
    })
})
app.post("/needer-update", function (req, resp) {

    var { fname, lname, nEmail, nPwd, address, city, nmbr, idprf } = req.body;
    var fileName1 = nEmail + "_" + req.files.profilePic.name;
    var fileName2 = nEmail + "_" + req.files.proofPic.name;
    var desPath = process.cwd() + "/Public/uploads2/" + fileName1;
    req.files.profilePic.mv(desPath);
    var desPath1 = process.cwd() + "/Public/uploads2/" + fileName2;
    req.files.proofPic.mv(desPath1);

    var ary = [fname, lname, nPwd, address, city, nmbr, idprf, fileName1, fileName2, nEmail];
    console.log(ary);
    refdb.query("update receiver set firstname=?, lastname=?, password=?, address=?, city=?, contact=?, idproof=?, filename1=?, filename2=? where email=?", ary, function (errorr) {
        if (errorr)
            resp.send(errorr.toString());
        else
        var path = process.cwd() + "/Public/welcome-needer.html";
        resp.sendFile(path);
    })
})
app.get("/jsonFetchProfile", function (req, resp) {
    console.log(req.query);
    var { nemail } = req.query;
    var ary = [nemail];
    refdb.query("select * from donor where email=?", ary, function (errorr, tableJSON) {
        if (errorr)
            resp.send(errorr.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });

})
app.get("/jsonFetchProfile2", function (req, resp) {
    console.log(req.query);
    var { nemail } = req.query;
    var ary = [nemail];
    refdb.query("select * from receiver where email=?", ary, function (errorr, tableJSON) {
        if (errorr)
            resp.send(errorr.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });

})
app.get("/fetchAll", function (req, resp) {
    refdb.query("select * from donor", function (errorr, table) {
        if (errorr)
            resp.send(errorr.toString());
        else
            resp.send(table);
    });

})
app.get("/fetch-cities", function (req, resp) {

    refdb.query("select distinct city from donor", function (errorr, tableJSON) {
        if (errorr)
            resp.send(errorr.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });
})
app.get("/fetch-meds",function(req,resp){

    refdb.query("select distinct medname from medicines",function(errorr,tableJSON)
        {
            if(errorr)
            resp.send(errorr.toString());
            else
             resp.send(tableJSON);
             console.log(tableJSON);
        });

     })
app.get("/fetch-medicine", function (req, resp) {

    console.log(req.query);

    var { xcity,ymedi } = req.query;

    var aryData = [xcity, ymedi];

    refdb.query("select * from medicines inner join donor on donor.email=medicines.email where donor.city=? and medicines.medname=?", aryData, function (err, tableJSON) {
        if (err)
            resp.send(err.toString());
        else
            resp.send(tableJSON);
        console.log(tableJSON);
    });

 })


app.get("/delete-record", function (req, resp) {
    var { email } = req.query;
    var ary = [email];
    refdb.query("delete from donor where email=?", ary, function (errorr) {
        if (errorr)
            resp.send(errorr.toString());
        else
            resp.send("Record Deleted");
    });
})
app.post("/med-submit", function (req, resp) {
    console.log(req.body);
    var { mEmail, medname, comp, medclass, route, mfgdt, expdt, pwr, qnty, other } = req.body;

    var ary = [mEmail, medname, comp, medclass, route, mfgdt, expdt, pwr, qnty, other];
    console.log(ary);
    refdb.query("insert into medicines values(?,?,?,?,?,?,?,?,?,?)", ary, function (errorr) {
        if (errorr)
            resp.send(errorr.toString());
        else
            resp.send("Data Updated Successfully");
    })
})

app.get("/fetchdonor",function(req,resp){
    console.log(req.query);
    var{xcity,xmedicine}=req.query;
    var ary=[xcity,xmedicine];
    refdb.query(" select * from medicines inner join donor on donor.email=medicines.email where donor.city=? and medicines.medname=?",ary,function(err,tableJSON){
      if(err)
      resp.send(err.toString());
      else
      console.log(tableJSON);
      resp.send(tableJSON);
    })
  })

  app.get("/fetchfulldetails",function(req,resp){
    console.log(req.query);
    var{nemail}=req.query;
    var ary1=[nemail];
    refdb.query("select * from donor where email=?",ary1,function(err,tableJSON){
        if(err)
        resp.send(err.toString());
        else
        console.log(tableJSON);
        resp.send(tableJSON);
    })
  })