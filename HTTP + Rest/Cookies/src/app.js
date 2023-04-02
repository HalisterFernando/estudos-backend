const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send('Welcome to a simple HTTP cookie server');
})

// setando um cookie
// rota get para adicionar um cookie

app.get('/setcookie', (req, res) => {
    res.cookie('Cookie token name', 'encrypted cookie string value');
    return res.send('Cookie have been saved successfully');

    // Quando esta rota for chamada, o cliente manda uma requisição para o servidor
    // Neste caso o servidor irá responder com um cookie armazenando ele no browser
})

// pegar cookies a partir da request
app.get('/getcookie', (req, res) => {
    console.log(req.cookies)
    return res.send(req.cookies)
})

// Você sempre deve tentar fazer os cookies inacessíveis nonavegador via javascript

// HTTPonly garante que um cookie não está acessível usando código javascript
// O atributo secure garante que o navegador irá rejeitar os cookies a não ser que
// a conexão aconteça por meio de HTTPS
// O atributo samSite aprimora a segurança e evita vazamento de privacidade

// Por padrão, samSite é setado como none, isso permite third parties trackear usuários através dos sites,
// Lax - o cookie só pode ser setado quando o domínio em uma URL do navegador der match com o domínio do cookie
// eliminando assim dominios third party
// Strict - irá restringir compartilhamento cross-site até mesmo entre diferentes domínios do mesmo dono


// você também pode determinar quanto tempo um cookie ficará armazenado no navegador
app.get('/cookieexpires', (req, res) => {
    res.cookie('Cookie token name', 'encrypted string value', {
        maxAge: 5000,
        expires: new Date('01 12 2023'),
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });

    return res.send('Cookie has been saved successfully');
})

// deletando cookies
// se cookies estão sendo usados para login
// quando um usuario deslogar, a requisição deverá acompanhar um comando de delete

app.get('/deletecookie', (req, res) => {
    res.clearCookie()
    return res.send('Cookie has been deleted successfully');
})

app.listen(3001, () => {
    console.log('Server is running por 3001')
})