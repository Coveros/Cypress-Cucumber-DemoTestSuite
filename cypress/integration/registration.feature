Feature: Register a new user on CodeVeros Portal

    As a CodeVeros User
    I want to create a CodeVeros Account
    So that I will be able to log in any time and interact with its functionality

Scenario: Successfully Register a new user
    Given I open CodeVeros Registration Page
    When I fill out registration form with valid values and submit it
    Then Coveros Welcome Page is presented
    And I can login to Codeveros portal with my credentials

Scenario: Registration Failed - Missing Username
    Given I open CodeVeros Registration Page
    When I fill out registration form with missing Username 
    Then Error Message says that Registration Failed
    And Register Button remains disabled 

Scenario: Registration Failed - invalid email - missing @
    Given I open CodeVeros Registration Page
    When I fill out registration form with invalid email - missing at sign
    Then Error Message states that email entry is invalid
    And Register Button remains disabled 

Scenario: Registration Failed - invalid email - null domain name
    Given I open CodeVeros Registration Page
    When I fill out registration form with invalid email - null domain name
    Then Error Message states that email entry is invalid
    And Register Button remains disabled 

Scenario: Registration Failed - invalid email - invalid domain name
    Given I open CodeVeros Registration Page
    When I fill out registration form with invalid email - invalid domain name
    Then Error Message states that email entry is invalid
    And Register Button remains disabled 

Scenario: Registration Failed - Missing Password
    Given I open CodeVeros Registration Page
    When I fill out registration form with missing password
    Then Error Message states that password field is required
    And Register Button remains disabled 

Scenario: Registration Failed - Missing Confirmed Password
    Given I open CodeVeros Registration Page
    When I fill out registration form with missing confirmed password
    Then Error Message states that confirm password field is required
    And Register Button remains disabled 

Scenario: Registration Failed - Password Mismatch 
    Given I open CodeVeros Registration Page
    When I fill out registration form with confirmed password that differs from password
    Then Error Message states confirmed password mismatch
    And Register Button remains disabled 

Scenario: Registration Failed - Try to register the same user twice 
    Given I am a registered user of Coveros portal
    When I am trying to register a new user with my credentials
    Then Error Message states that Registration Failed
