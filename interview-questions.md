# ASSESSMENT 6: Interview Practice Questions

Answer the following questions.

First, without external resources. Challenge yourself to answer from memory.

Then, research the question to expand on your answer. Even if you feel you have answered the question completely on your own, there is always something more to learn. Write your researched answer in your OWN WORDS.

1. As a developer, I am creating a Rails application with a model called Cohort that has_many students, but OOPS! I forgot to add the foreign key. How can I fix this mistake? What is the name of the foreign key? Would the foreign key be on the Cohort model or the Student model?

Your answer: No biggie! We would have to perform a migration here to add a new column to the Student model. In your terminal:

$ rails g migration add_column_to_student_for_foreign_id

this will create a migration file in your rails app in this path:

db/migrate/<date_time_created>add_column_to_student_for_foreign_id.rb

in this file within the class that was generated you will need to add a method called change that contains an add_column statement (and in this order) the table name (:students) the column that you want to add (:cohort_id) and the data type that an input in that column should be(:integer). :cohort_id is the foreign key that a given student belongs to. we also need to make sure that student.rb in app/models/student.rb has belongs_to :cohort in the class.

after saving these files, back in the terminal run $rails db:migrate to add our changes to our database. Job's done!

Researched answer: To change something with an existing model, we must generate a migration by running $ rails generate migration AddWhateverToWhatever (PascalCase or snake_case (also the rails docs mixed up camelCase and PascalCase lol)) in the console. (If at the end of your terminal command you add the column and data type ($ rails generate migration AddWhateverToWhatever whatever:string) the migration file will generate the add_column for you.) This generates a migration file in the db/migrate directory, with the file name including the date and time (to the second). This file contains an empty class that inherits from the ActiveRecord::Migration class. You can then define your method to add_column, and pass in the table name, column name, and data type. (you can actually do a ton of things with migrations apparently). After completion of editing your migration file, run a rails db:migrate to commit your changes.
(source -https://guides.rubyonrails.org/active_record_migrations.html)

2. Which RESTful routes must always be passed params? Why?

Your answer: show, update, edit, destroy all require params passed with them because all of these routes call on a specific instance of data within a model to manipulate. params allow us to access specific columns of a model. we dont need params for new, index, or create because they dont need a specific piece of data to perform their methods.

Researched answer: We pass params into routes to essentialy require extra information from a user in order to access specific instances of data within a model. We can also use params when creating new instances of data within a model, but it isnt required in the routing specifically. All of the show, edit, update, and destroy routes need params in the routing in order to perform their respective controller methods.
(source - https://guides.rubyonrails.org/routing.html, https://www.rubyguides.com/2019/06/rails-params/)

3. Name three rails generator commands. What is created by each?

Your answer:

rails g model Model_name column_name:data_type column_name:data_type - generates a model that has a table with as many columns as you define. - creates a model.rb and controller.rb (nope) for the model - also creates a migration file and updates/adds the schema file (i'm not actually sure if rails creates a schema at first???) - creates a spec file if running rspec

rails g resource Model_name column_name:data_type column_name:data_type - does all of the above, but also creates the generic RESTful routes in the routes.rb file

rails g migration whatever_you_want_to_change - creates a migration file that is titled whatever you named the migration - its a file that you can then define a method that changes or adds things to an existing model

Researched answer: Three common rails generator commands are Model, Resource, and Controller. The model generator creates a migration, model and tests for the files that where generated. A resource generator does the same as the model generator, but also creates the controller, resource routes, and a views folder. the Controller generator creates a (you guessed it) controller as well as methods if you chose to create specific methods when running the controller generator. We can also generate migrations, which create migration files. There is another generator i've found called Scaffold that creates a model, controller, and all the views needed for restful routing and full crud functionality (why even code at this point lol). Its not considered best practice to use Scaffold because it takes too much power away from the developer when creating a model.
(sources - https://medium.com/@josephdlawson21/using-the-generate-command-in-rails-9c738380f2d9, https://ltramos7.medium.com/new-to-rails-generate-controller-model-42c3fdef1b32)

4. Consider the Rails routes below. What is the name of the controller method that would be called by each route? What action would each of the controller methods perform?

action: "GET" location: /students - the index controller method, the index method would call on the db and display all of the students. it would be the same as running Student.all in the rails console

action: "POST" location: /students - the create controller method would be called on here, the create method would be used to create a new student in the model, and would need to be passed strong params in order to ensure only valid students are created

action: "GET" location: /students/new - the new controller method, the new method would get a new html form in order to create a new student, a student would not be created without a create controller route and method. but new provides the view in which a user could input the data for the students columns.

action: "GET" location: /students/2 - the show controller method, the show method is used to display a specific id of the student table (2). calling the id shows all of the columns of the student with that id. the show method needs to be passed params.

action: "GET" location: /students/2/edit - the edit controller method, the edit method would get an html form to edit a student, similar to new, it doesnt actually edit a student without an update route and controller method. the edit method needs to be passed params.

action: "PATCH" location: /students/2 - the update controller method, the update method can change an existing student. the update method needs params passed in to access the student that the user wants to update. it also needs strong params passed so that we can ensure the updated student still passes validation.

action: "DELETE" location: /students/2 - the destroy controller method, the destroy method deletes/destroys/removes/blows up/trashes/terminates a specific student in the model. it needs params in order to find a specific student.

5. As a developer, you are making an application to manage your to do list. Create 10 user stories that will help you get your application started. Read more about [user stories](https://www.atlassian.com/agile/project-management/user-stories).

User Story 1: As a user, I need to see all of the tasks on my to do list

    Branch: to-do-index

    Acceptance Criteria
       -has a model for ToDo with a task and description
       -has a controller for ToDo
       -has a controller method for index
       -has a route for index
       -has a view for index
       -can see all ToDo tasks on the landing page

User Story 2: As a user, I need to be able to see the details of a specific to do task

    Branch: to-do-show

    Acceptance Criteria
        -has a controller method for show
        -has a route for show
        -has a view for show
        -can navigate from the landing page to a different page of any given ToDo task
        -can see the task, content, and completion status for the given ToDo task
        -can navigate back to the landing page from the specific task page


User Story 3: As a user, I need to be able to interact with a form to create a new task

    Branch: to-do-new

    Acceptance Criteria
        -has a controller method for new
        -has a route for new
        -has a view for new
        -can navigate from the landing page to the view of the new page
        -can see a form for task and description
        -can see a sumbit button
        -can navigate to the landing page from the new page

User Story 4: As a user, I need to be able to create a new task in the ToDo list

Branch: to-do-create

Acceptance Criteria
-has a controller method for create
-has a route for create
-can fill out the form for task and description on the new view
-the submit button on the new view triggers an action to add the new task to the ToDo database
-validate the content in the new task, then redirect to the landing page on a successful creation

User Story 5: As a user, I need to see be able to delete a task

Branch: to-do-delete

Acceptance Criteria
-has a controller method for delete
-has a route for delete
-can see a button on a task show page that deletes a task
-when the delete button is clicked, it performs a delete action
-after a successful deletion, i am redirected to the landing page.

User Story 6: As a user, I need to see a form to fill out information to edit an existing ToDo task

Branch: to-do-edit

Acceptance Criteria
-has a controller method for edit
-has a route for edit
-has a view for edit
-can navigate from the show page of an existing task to an edit view of the same task
-can see a form to edit task and description
-can see a sumbit button
-can navigate from the edit view to the original task show page
-can navigate to the landing page from the edit page

User Story 7: As a user, I need to be able to update an existing task in ToDo

Branch: to-do-update

Acceptance Criteria
-has a controller for update
-has a route for update
-can fill out the form on the task edit page to change the existing data in task and description
-can click on the submit button to trigger the update action
-if the update in valid, will be redirected to the show page of the task that has been updated

User Story 8: As a user, I cannot enter invalid data into the database

Branch: to-do-validations

Acceptance Criteria
-Validate that all ToDo tasks and descriptions are acutal values and are present when initialized
-Validate that each task entered is unique
-Validate that each description is at least 5 characters

User Story 9: As a user, I need to be notified when I try to enter invalid data

Branch: to-do-errors

Acceptance Criteria
-can see a validation error if a ToDo does not include a task or a description
-can see a validation error if a ToDo is initialized with a duplicate task
-can see a validation error if a description is less than 5 characters
-these errors are presented to the user when they perform an incorrect action

User Story 10: As a user, I can see accessible styling that is consistent through each page of the app.

Branch: to-do-styling

Acceptance Criteria
-has styling applied to each page
-styling is accessible to users with disabilities
