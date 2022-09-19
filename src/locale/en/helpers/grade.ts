export const grade = {
  errors: [
    'Warnings and errors mean that user`s grade was not changed',
    'You can fix these errors and warnings and resend your table',
    'Grades of users which are not shown on "Errors" tab were changed successfully',
  ],
  tableFormat: [
    'Table must have following columns (in any order): login, grade',
    'login - user`s login must be unique; cannot be empty',
    'grade - group to which user will be added; group must be in such form: `11 A`, cannot be empty',
    'In case if the grade does not exist, you can create it on the corresponding tab',
    'Old grades will be deleted and replaced by new ones; due to this all the activities connected with grades will become invalid',
  ],
  attention: [
    'Changing the grades may take some time (5-10 minutes)',
    "During changing some site's features may not work correctly",
    "Due to this, we recommend to change the grades when the site's load is low",
  ],
};
