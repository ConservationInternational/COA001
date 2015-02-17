# Contexts

Contexts here are a loose interpretation of [DCI][0].  This codebase doesn’t play into trying to enforce separation between Roles and objects, but it does have a concept of Contexts.  

Contexts should be thought of as a way to organize the domain specific code.  Instead of bloating models with various methods, create a Context instead!

A context is simply a function.  The naming scheme should be CamelCase (with the first letter capitalized), and should take the form of a gerund (ending in `-ing`).  Examples:

```
function StartingSurvey(user, survey) {…}
function AddingBirdToSurvey(user, bird, survey) {…}
function VerifyingSurvey(user, survey) {…}
```

Think of models as containing the code for fields, persistence, and perhaps simple validation.  Contexts should contain the code where the interesting stuff happens

[0]: http://www.wikiwand.com/en/Data,_context_and_interaction