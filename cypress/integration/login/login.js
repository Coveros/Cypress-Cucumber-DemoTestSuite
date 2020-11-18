import {Given, When, Then} from "cypress-cucumber-preprocessor/steps"
import { LoginTab } from '../coveros_website/POM/login_tab'
import { WelcomePage } from '../coveros_website/POM/welcome_page';
import { NameMaker } from '../coveros_website/Utilities/name_maker';

const welcomePage = new WelcomePage();
const login = new LoginTab();
var name = null;
var userName = null;
var password = null;
 
Given('I open CodeVeros Login Page', () => {
    login.visit();
})
 
When('I enter valid login and password and submit login form', ()=>{
    name = NameMaker.makeName(6);
    userName = name;
    password = "aat";
    cy.request('POST', 'http://localhost/api/auth/register', {
        "firstName": name,
        "lastName": name,
        "username": userName,
        "email": name+"@gmail.com",
        "password": password
    }).then((response) => {
        // response.body is automatically serialized into JSON
        expect(response.body.user).to.have.property('firstName', name);
    });

    login.fillIn(userName, password);
    login.submit();
})
 
When('I enter valid password and missing a username', ()=>{
    name = NameMaker.makeName(6);
    userName = name;
    password = "aat";
    cy.request('POST', 'http://localhost/api/auth/register', {
        "firstName": name,
        "lastName": name,
        "username": userName,
        "email": name+"@gmail.com",
        "password": password
    }).then((response) => {
        // response.body is automatically serialized into JSON
        expect(response.body.user).to.have.property('firstName', name);
    });

    login.fillIn(userName, password);
    login.clearUsernameField();
})

When('I enter valid username and missing a password', ()=>{
    name = NameMaker.makeName(6);
    userName = name;
    password = "aat";
    cy.request('POST', 'http://localhost/api/auth/register', {
        "firstName": name,
        "lastName": name,
        "username": userName,
        "email": name+"@gmail.com",
        "password": password
    }).then((response) => {
        // response.body is automatically serialized into JSON
        expect(response.body.user).to.have.property('firstName', name);
    });

    login.fillIn(userName, password);
    login.clearPasswordField();
    login.usernameInputClick();
})

When('I am trying to login non-existing user', ()=>{
    login.fillIn("newUnregisteredUser", "aatt");
    login.submit();
})

Then('Coveros Welcome Page is presented', ()=>{
    welcomePage.getUserMenuItem().should('exist');
})

Then('Error Message says that username is required', ()=>{
    login.getRequiredFieldErrorMessage().should('exist');
})

Then('Error Message says that password is required', ()=>{
    login.getRequiredFieldErrorMessage().should('exist');
})

Then('Error Message says that I am not autorized to log in', ()=>{
    login.getLoginFailedMessage().should('exist');
})