function Validation(values) {
    let error = {};
    const username_pattern = /^[a-zA-Z0-9._-]{3,}$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phone_pattern = /^\+?[1-9]\d{1,14}$/; // E.164 format
    const name_pattern = /^[a-zA-Z\s]{2,}$/;

    if (values.name === "") {
        error.name = "Name is required";
    } else if (!name_pattern.test(values.name)) {
        error.name = "Invalid name";
    } else {
        error.name = "";
    }

    if (values.username === "") {
        error.username = "Username is required";
    } else if (!username_pattern.test(values.username)) {
        error.username = "Invalid username";
    } else {
        error.username = "";
    }

    if (values.email === "") {
        error.email = "Email is required";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Invalid email format";
    } else {
        error.email = "";
    }

    if (values.phone === "") {
        error.phone = "Phone number is required";
    } else if (!phone_pattern.test(values.phone)) {
        error.phone = "Invalid phone number format";
    } else {
        error.phone = "";
    }

    if (values.role === "") {
        error.role = "Role is required";
    } else {
        error.role = "";
    }

    if (values.password === "") {
        error.password = "Password is required";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
    } else {
        error.password = "";
    }

    if (values.confirmPassword === "") {
        error.confirmPassword = "Confirm password is required";
    } else if (values.password !== values.confirmPassword) {
        error.confirmPassword = "Passwords do not match";
    } else {
        error.confirmPassword = "";
    }

    return error;
}

export default Validation;
