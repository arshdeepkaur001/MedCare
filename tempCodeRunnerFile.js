
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