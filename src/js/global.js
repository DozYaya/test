const Token = false

function before(){
    if (sessionStorage.getItem('Token')){
        this.Token = true
    }
}

export default {
    Token
}
