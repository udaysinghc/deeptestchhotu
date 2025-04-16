Feature: Dashboard Functionality
  As a logged in user
  I want to access and view my dashboard
  So that I can see my personalized information and overview

  Background:
    Given the user enters username "testuser1744775890841@internalreai.com" and password "Testuser@123"
    Then I should be logged in successfully

  @dashboard
  Scenario: Accessing the dashboard after login
    When I click the deep Agent option