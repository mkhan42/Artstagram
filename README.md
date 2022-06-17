# Artstagram
SEI 5/9 Project 2: Artstagram </br>
The idea of this project is to create a platform for artists to upload and promote their work within the art community. 

Link to site: https://artstagrams.herokuapp.com/

![wireframe](./images/index.png)

# User Story
The user story to this app is for a user to be able to log in, or create a profile with the fields username and password. 
<br>

Once these fields are created, a user should be a ble to login to their account by entering their username and password. 

<br>

Once logged in, the user should be able to upload their own artwork to their page. 
<br>
They should add the name, image, title, description, and tools used. 

<br>

They can add, edit, or delete art on their own pages. 

<br>

However, there should be multiple users and a user cannot add, edit, or delete artwork on another user's profile. 

<br>
A user can, however, leave comments on other user's artwork they can edit, add, or delete their own comments. 

<br>
A user can delete anyone's comment left on their post.
<br>

# Technologies used
* HTML 
* CSS
* BootStrap
* JavaScript
* liquid js
* node js
* express js
* MongoDB and Mongoose
* Heroku (for deployment)
* Git
* All the images used were found on an open source site https://unsplash.com/

# How to install
Write 
<br>

 npm install

 <br>

 to the command line. Then go to localhost:4000 on your browser


# When you first open the app...
![wireframe](./images/index.png)
 
 This is the page you get when the app is first opened. It's a login page that gives the user an option to create an account.

 ## Code that opens to this page...
 ![wireframe](./images/serverindex.png)

 The server.js file is where the login page is rendered upon first opening the app. You can see this portion of the code in lines 41-43.

 ## Behind the scenes of when a user tries to log in...
  ![wireframe](./images/login.png)

  The code above is what goes on when a user attempts to login. First, it will try to find if the user exists by trying to find their username. The the code compares the password to the username; if successful, meaning that the username and passwords match, the user will be able to log in. Otherwise, the program will check if the password matches the username, and then if the username even exists.

  ## When a user has to sign up...
  ![wireframe](./images/signin.png)

  If a user does not have an account, they will have to create an account. The page above is what that looks like. They have create a username and password only.

## Behind the scenes of a user signing up...
![wireframe](./images/signincontrol.png)

Once a user fills in both username and password fields, then they will be redirected to the login page.

## When a user logs out...
![wireframe](./images/logout.png)

When a user logs out of their account, the code shown above is what that looks like. The session is destryed and then redirected to the main login page.

## Successfully logging in...
![wireframe](./images/afterlog.png)
Once a user successfully logs in to their account, they get redirected to the page above. The page above gives them options to create a new post or click on any of the options in the nav bar. They have the option to go to their page where they will see all their posts, feed is where they will see everyone's posts, add posts is where they can create a new post (it goes to a form), and then they also have the option to log out. The code below is how this page is rendered.

![wireframe](./images/addNew.png)

# My Page
![wireframe](./images/mypage.png)

When a user clicks on my page, they only see their own posts. The code below is how this is done. (Side note: If the user has no posts, the will still see the same page but just without the image that's already there)

![wireframe](./images/mypagecode.png)

This shows how the user is only able to see their own posts once they click my page. The code uses the mongoose/mongodb find method to look for the username of the current session and show all posts associated with that user.

# Add Post
![wireframe](./images/new.png)

If a user clicks on add a new post, they will be taken to this form in which they will have to input the seen fields. They are directed to this page by the code below.

![wireframe](./images/newform.png)

Once a user hits add post, they post is then posted on to their "my page" and "feed" page. The code below explains how that is done.

![wireframe](./images/newpost.png)

The code first sets the post to the user of the session, so that when it's rendered on to the 'my page', it's set to that same user and it's only the post of that user. The user is also redirected to their 'my page' after the post is submitted.

# Feed Page

![wireframe](./images/feedpage.png)

When a user clicks on feed, it looks similar to the 'my page' page, EXCEPT now they can see all users' posts. The code below explains how this is done.

![wireframe](./images/feedcode.png)

The code uses a get method and then a mongoose find function to find all users posts.

# When a user clicks on their/any posts...
![wireframe](./images/show.png)

When a user clicks on their own post, it looks like the page above. They can see more details about the post, as well as comments, and the edit and delete buttons of the post. The user can delte any comment posted on to their post. 
<br>
In a simialr manner, if the user clicks on a post that is not their own, it will look like the image above, except for the fact that they will not see the edit or delete buttons of that post or the delete on comments UNLESS it's their own comment on someone else's post.

<br>
If the post does not belong to the logged in user, and the current user comments on it, they will also be able to edit or delete those comments.

<br>

The post is shown by the code below.

![wireframe](./images/showID.png)

The code is using a get method to retrieve and then show that post of that id.


## Edit your post
![wireframe](./images/editpost.png)

A user is able to edit their post by the code above. The code above is redirecting the user to an edit post form, which looks identical to the add new post form.

![wireframe](./images/putedit.png)

When a user hits submit, they get redirected to their own page showing the new post added there. This is done by using a put method and using the mongoose findByIdAndUpdate function to edit the post with that specific id. The new post will also be added to the feed page.


## Delete post
![wireframe](./images/deletepost.png)

A user is able to delete their post by the code above. The code is using a delete method and using the mongoose findByIdAndRemove to remove the post with that specific id. Once delete is hit, the user is redirected to their 'my page'.

# Adding a comment
![wireframe](./images/postcomment.png)

A user can add a comment on anyone's post. This is done by using a post method and finding the post of with that specific id (using mongoose findById method) to put the comment on that post. The user is then redirected to the page they already were on with that specific id, by they will be able to see their comment on that page. Since comment is an embedded document of Post, we have to always use .save to save it.

## Edit comment
![wireframe](./images/editcomment.png)

A user is able to edit any of their comments using the code above. This is done by fidning the id of the post and the comment, and then being redirected to a form in which the user can update their comment.


![wireframe](./images/putcomment.png)

Once a user hits submit to update their comment, then a put method is used. Again, we use findById to find the id of the post. Because the id's are objects, we convert them to strings and see if the id of the post is equal to the id of the comment and then we just change the content. We then use the save method to save the comment. The user is then redirected to the post with that specific id. We use the remove method to actually remove the comment, and then we save again. Once a user hits delete on a comment, they are then redirected to the same page with the comment gone.

## Delete Comment
![wireframe](./images/deletecomment.png)

A user can also delte their own comments, and any comment on their own post. This is done by using a delete method, and then similar to the way that the comments can be updated by turning the id's into strings and seeing if they are equal.

## User Schema
![wireframe](./images/user.png)
This is what my user schema looked like.


## Post Schema
![wireframe](./images/user2.png)
This what my Post and Comment schemas look like. Comments is an embedded document of Post.

# Final ERD
![wireframe](./images/finalerd.png)

# WireFrames/Planning
![wireframe](./images/wireframe1.jpeg)
This image explains my so far thought process with the idea. Shows what collections I might have (still a working progress and open for suggestions), what one can do on their profile, and what my art schema would consist of.

<br>

![wireframe](./images/wireframe2.jpeg)
This image shows what the index page would look like and then what the user page would look like.

<br>

![wireframe](./images/wireframe3.jpeg)
This image shows what the show page would look like once you click on your art work.

<br>

# Original ERD
![erd](./images/erdiagram.jpeg)

# Future Considerations
* Being able to uplad a file rather than just submitting a url to the database (want to try to use cloudinary)
* Want to create a favorites/inspiration board (kind of like pinterest). I want to use an art api in which the user can save art works that they like to their inspiration board, but I also want them to be able to save other users' art to their inspiration board too.
* Add a likes feauture to comments and posts.
* See if I can figure out a reply to comment.
* Add a profile section where a user can also update their profile.
* Make it mobile friendly

# References
* Ivy Le for edit and delete comments
* This codepen for login and sign up page: https://codepen.io/Devel0per95/pen/rjOpdx*/
