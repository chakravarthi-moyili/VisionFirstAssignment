function Validation(values){
    let error = {}
    const username_pattern = /^[a-zA-Z0-9._-]{3,}$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

    if(values.username === "") {
        error.username = "username is required"
    }
    else if(!username_pattern.test(values.username)) {
        error.username = "Invalid username"
    }
    else {
        error.username = ""
    }

    if(values.password === "") {
        error.password = "Password is required"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Enter correct password"
    }
    else {
        error.password = ""
    }
    return error;
}

export default Validation
