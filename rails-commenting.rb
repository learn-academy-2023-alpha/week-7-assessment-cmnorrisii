# ASSESSMENT 6: Rails Commenting Challenge

# Add comments to the Rails Blog Post Challenge
# Explain the purpose and functionality of the code directly below the 10 comment tags


# FILE: app/controller/blog_posts_controller.rb

# ---1)
# this is the controller for the BlogPost model. It is a child class that inherits from ApplicationController, and contains the definition of methods to accomplish our CRUD actions, HTTP verbs, and RESTful routes. This is where we lay out how a user can interact with our databses.
class BlogPostsController < ApplicationController
  def index
    # ---2)
    # we are creating the instance variable @posts and assigning in to BlogPost.all, which is within our index method for the BlogPost controller, this will show a user all of the instances of BlogPost when they include whatever was defined in the routes.rb file for a GET request in their URL. we can create a view (index.html.erb) to present the data to a user
    @posts = BlogPost.all
  end

  # ---3)
  # our show method is another GET request that shows a specific instance of BlogPost, we define the instance variable as @post and assign the BlogPost.find(params[:id]) method. The params are required here in order to call on only one instance in the query, and would be required to be passed in the routing. we would need to create a view (show.html.erb) to show the user the data they're requesting.
  def show
    @post = BlogPost.find(params[:id])
  end

  # ---4)
  #  the 'new' method is another GET request and is returning an html form that is used to create a new BlogPost. this method alone will not store a new BlogPost because we are not initializing the BlogPost with the proper initialization data. However it is required in order for us to accomplish the GET and POST (with create) CRUD actions. we would need to create a view in order to allow for user input.
  def new
    @post = BlogPost.new
  end

  def create
    # ---5)
    # our create method is out POST request. we are declaring an instance variable of @post that is assigned the method to create a new blog post that is being passed some strong params which are defined below the 'private' keyword in this file. these strong params both require specific data and permit only specific columns from the model. the create method is also redirecting a user to the show view of the newly created BlogPost if the the created BlogPost passes validation.
    @post = BlogPost.create(blog_post_params)
    if @post.valid?
      redirect_to blog_post_path(@post)
    end
  end

  def edit
    # ---6)
    # the edit method is another GET request that defines an instance variable @post as the method to find a specific blog post by passing in the id as params. we then use this method in conjuction with the update method to change an existing BlogPost. edit returns an html form, we can create a view (edit.html.erb) to provide a user with a form to fill out to change the data within a specific (by id) BlogPost.
    @post = BlogPost.find(params[:id])
  end

  def update
    @post = BlogPost.find(params[:id])
    # ---7)
    # this is the functionality to actually edit/update/change data when using our edit view, it takes the BlogPost identified from the above method and updates it based on the strong params. If the update to the post is valid, then the user will be redirected to the show page of the given (by id) BlogPost.
    @post.update(blog_post_params)
    if @post.valid?
      redirect_to blog_post_path(@post)
    end
  end

  def destroy
    @post = BlogPost.find(params[:id])
    if @post.destroy
      # ---8)
      # if a post is destroyed, the user is redirected to the index page (blog_posts(index) vs blog_post(show)) which will show the current collection of BlogPosts. (This is all depending on the proper routes being set up with these aliases of course)
      redirect_to blog_posts_path
    end
  end

  # ---9)
  # the private keyword restricts the scope of where a method can be called to the controller they are defined in. we typically want to define our strong params under the private keyword so that they cannot be used outside of this controller. this is applied to everything beneath the private keyword.

  private
  def blog_post_params
    # ---10)
    # strong params! when we call on the blog_post_params we are essentially placing control over what information is being allowed into our database. its an extra layer of protection when updating of creating data. the 'require' method limits anything added to the BlogPost db to be a blog post, as in you wouldnt be able to accidentally create or update something you meant to be a part of a different db. the 'permit' method only allows certain items to be present when creating or updating a BlogPost. Strong params are seperate from validations, which are set up in the .rb file of the respective model.
    params.require(:blog_post).permit(:title, :content)
  end
end
