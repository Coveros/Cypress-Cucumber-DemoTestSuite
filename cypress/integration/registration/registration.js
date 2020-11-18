import {Given, When, Then} from "cypress-cucumber-preprocessor/steps"
import { RegistrationTab } from '../coveros_website/POM/registration_tab'
import { WelcomePage } from '../coveros_website/POM/welcome_page';
import { NameMaker } from '../coveros_website/Utilities/name_maker';

const welcomePage = new WelcomePage();
const registrationTab = new RegistrationTab();

var name = null;
var password = null;

Given('I open CodeVeros Registration Page', () => {
    cy.visit('http://localhost/login');
    cy.contains('Register').click();
})

Given('I am a registered user of Coveros portal', () => {
    return null;
})

When('I fill out registration form with valid values and submit it', ()=>{
    name = NameMaker.makeName(6);

    registrationTab.fillIn(name, name, name, name+"@gmail.com", "aaa", "aaa");
    registrationTab.submit();
})

When('I fill out registration form with missing Username', ()=>{
    name = NameMaker.makeName(6);

    registrationTab.fillIn(" ", " ", " ", "a@gmail.com", "aaa", "aaa");
    registrationTab.submit();
})

When('I fill out registration form with invalid email - missing at sign', ()=>{

    registrationTab.fillIn(" ", " ", " ", "agmail.com", "aaa", "aaa");
})

When('I fill out registration form with invalid email - null domain name', ()=>{

    registrationTab.fillIn(" ", " ", " ", "a@.", "aaa", "aaa");
})

When('I fill out registration form with invalid email - invalid domain name', ()=>{

    registrationTab.fillIn(" ", " ", " ", "a@.com", "aaa", "aaa");
})

When('I fill out registration form with missing password', ()=>{
    name = NameMaker.makeName(5);

    registrationTab.fillIn(" ", " ", name, "a@gmail.com", "aaa", "aaa");
    registrationTab.clearPasswordField();
})

When('I fill out registration form with missing confirmed password', ()=>{
    name = NameMaker.makeName(5);

    registrationTab.fillIn(" ", " ", name, "a@gmail.com", "aaa", "aaa");
    registrationTab.clearConfirmPasswordField();
})

When('I fill out registration form with confirmed password that differs from password', ()=>{
    name = NameMaker.makeName(5);

    registrationTab.fillIn(" ", " ", name, "a@gmail.com", "aaa", "bb");
})

When('I am trying to register a new user with my credentials', ()=>{
    var name = NameMaker.makeName(5);
    
    registrationTab.clearFields();
    registrationTab.fillIn(name, name, name, name+"@gmail.com", "aaa", "aaa");
    registrationTab.submit();
    welcomePage.signOut();
    cy.contains('Register').click();
    registrationTab.fillIn(name, name, name, name+"@gmail.com", "aaa", "aaa");
    registrationTab.submit();
})

Then('Error Message says that Registration Failed', ()=>{
    registrationTab.getRegistrationFailedMessage().should('exist');
})

Then('Error Message states that email entry is invalid', ()=>{
    registrationTab.getInvalidEmailMessage().should('exist');
})

Then('Error Message states that password field is required', ()=>{
    registrationTab.getInvalidPasswordMessage().should('exist');
})

Then('Error Message states that confirm password field is required', ()=>{
    registrationTab.getInvalidPasswordMessage().should('exist');
})

Then('Error Message states confirmed password mismatch', ()=>{
    registrationTab.getPasswordMismatchMessage().should('exist');
})

Then('Coveros Welcome Page is presented', ()=>{
    welcomePage.getUserMenuItem().should('exist');
})

Then ('Error Message states that Registration Failed', ()=>{
    registrationTab.getRegistrationFailedMessage().should('exist');
})

Then ('I can login to Codeveros portal with my credentials', ()=>{
    return null;
})

Then ('Register Button remains disabled', ()=>{
    return null;
})

