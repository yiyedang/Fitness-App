# Fitness-App

This assignment will continue on the essentials of React Native, Expo, and RESTful APIs through the implementation of a fitness statistics application. 
Specifically, you will be building a login screen, a signup screen, and a user profile screen including a day view, a goals comparison view, and a way to create/update/delete both exercises.


## Part I
### Problem 1 (1.5 Points)
Create a “Login” view with username and password input fields

- Provide the user with feedback if there is an error, such as "Username or password is incorrect!"
- Provide the user with functionality to switch between the login and signup pages (see problem 2). 

![login](https://github.com/yiyedang/Fitness-App/blob/main/images/login-0.jpg)

### Problem 2 (1.5 Points)
Create a “Signup” view with username and password fields

- Provide the user with feedback if there is an error, such as "Username is already taken!" or "Password is too short!"
- Provide the user with functionality to switch between the login and signup pages (see problem 1). 



### Problem 3 (2 Points)
Create a profile view that allows the logged-in user to view and edit their first and last names and goals

- For the time being, this can be the landing page after logging in to the application. We will be expanding the application in React Native 2 𝞪.
- When the user edits their profile, it should be saved (see the API!)

![profile](https://github.com/yiyedang/Fitness-App/blob/main/images/profile-0.jpg)


## Part II
### Problem 1 (0.5 Points)
Provide the user with an option to sign out and return to the login screen at any point while they are logged in to the application.


### Problem 2 (2 Points + 0.25 Extra Credit Points)
Provide the user with a "Today View" with the ability to view their exercises logged for today. The ways to create, update, and delete exercises will be detailed in Problem 4.

- The user should be able to see their exercises for today, including the name, duration, and the total number of calories burned for each exercise.
-The Today View should be updated in sync with the Exercises View; if a change is made to an exercise in the Exercises View, it should be reflected in the Today View. Similarly, if an exercise is added or created in the Exercise View, it should be added or deleted in the Today View.
(0.25 Extra Credit Points) The user should also be able to see their meals for today, including the foods and the total number of calories and macronutrients for each meal. The extra credit problem must be completed first to be eligible for these points.

![today](https://github.com/yiyedang/Fitness-App/blob/main/images/today.jpg)

### Problem 3 (1 Point + 0.25 Extra Credit Points)
Provide the user with the ability to compare today's activity minutes versus their daily goal activity minutes. This can be made a part of the "Today View" from Problem 2 or be made as a separate view.

- The user should be able to compare their total daily activity minutes (calculated as the sum of all exercise activity) versus their daily goal activity minutes.
- The view should be updated in sync with the Profile View; if a change is made to the user's goals, it should be reflected in their comparison.
(0.25 Extra Credit Points) The goals comparison should also show the difference in their overall calories and macronutrients. The extra credit problem must be completed first to be eligible for these points.



### Problem 4 (2 Points)
Provide the user with the ability to create a new exercise or edit/delete any of their past exercises. An exercise consists of a name (e.g., "Jogging"), duration, date, and the number of calories burned; see the API for further details.

- The user should be able to see and specify the name, duration, and the number of calories burned for each exercise.
- The user should be able to indicate if the exercise was done at the current time or at some other time.
 
![exercise](https://github.com/yiyedang/Fitness-App/blob/main/images/exercise.jpg)

### Final Criteria (0.5 Point)
Appropriately utilize icons or graphics to visually aid in the user experience; for example, you may want to have a graphic of a person exercising in the exercises view or a graphic of food in the meals view. Check the approved libraries (Links to an external site.) for pre-made icons and graphics! (0.25 points)
Use React Navigation in order to help the user navigate between views; this could include tabs, drawers, stacks, or any of the navigation techniques outlined in the React Native 2 lecture (Links to an external site.). (0.25 points)
 

### Extra Credit Problem (1.5 points)
Provide the user with the ability to create a new meal, or edit/delete any of their past meals. A meal consists of a name (e.g., "Lunch"), a date, and a list of foods; see the API for further details.

- The user should be able to see and specify 0-to-many foods that they ate for that meal.
- The user should be able to see the total calories and macronutrients consumed for that meal.
- The user should be able to indicate if the meal was eaten at the current date and time or at some other date and time.

![meals](https://github.com/yiyedang/Fitness-App/blob/main/images/meals-0.jpg)
![meal-detail](https://github.com/yiyedang/Fitness-App/blob/main/images/meal-detail-0.jpg)
