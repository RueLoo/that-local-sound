'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');

angular.module('myApplicationModule', ['google-maps'.ns()]);
