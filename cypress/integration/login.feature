Feature: Login to CodeVeros Portal

    As a CodeVeros User
    I want to login to my CodeVeros Account
    So that I will be able to interact with its functionality

Scenario: Successfully Login to CodeVeros Portal
    Given I open CodeVeros Login Page
    When I enter valid login and password and submit login form
    Then Coveros Welcome Page is presented

Scenario: Login Failed - Missing username
    Given I open CodeVeros Login Page
    When I enter valid password and missing a username
    Then Error Message says that username is required 

Scenario: Login Failed - Missing Password
    Given I open CodeVeros Login Page
    When I enter valid username and missing a password
    Then Error Message says that password is required 

Scenario: Login Failed - Not Authorized
    Given I open CodeVeros Login Page
    When I am trying to login non-existing user
    Then Error Message says that I am not autorized to log in
