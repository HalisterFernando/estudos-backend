const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const app = express();

app.use(helmet());
app.use(cookieParser());

app.use(express.json());

// precessar o post request recebido pelo ejs
app.use(express.urlencoded({ extended: false }));

// permite que o express leia e renderize o arquivo css
app.use(express.static(path.join(__dirname, '..', "/public")));
app.set("view engine", "ejs");

// renderiza ejs views

app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    // verifica se usuário está logado verificando o cookie
    const username = req.cookies.username;

    // renderiza home page
    return res.render("home", {
        username
    });
});

app.get('/login', (req, res) => {
    // verificar se existe uma msg query
    const bad_auth = req.query.msg ? true : false;

    if (bad_auth) {
        return res.render("login", {
            error: "Invalid username or password"
        })
    }

    return res.render("login");
});

app.get('/welcome', (req, res) => {
    // pega o nome de usuário
    const username = req.cookies.username;

    // renderiza welcome page
    return res.render("welcome", {
        username
    });
});

app.post("/process_login", (req, res) => {
    const { username, password } = req.body;

    // fake teste data
    let userDetails = {
        username: "Bob",
        password: '123456'
    };

    // validação 

    if (
        username === userDetails.username &&
        password === userDetails.password
    ) {
        // salvando informações em cookies
        res.cookie("username", username)
        // redirect
        return res.redirect("/welcome")
    }

    return res.redirect('/login?msg=fail');
});

app.get("/logout", (req, res) => {
    // limpa os cookies
    res.clearCookie("username");

    return res.redirect('/login')
})

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
});

