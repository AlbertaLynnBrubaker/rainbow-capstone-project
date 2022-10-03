class PostsController < ApplicationController
  skip_before_action :authenticate_user, only: [:index, :wall]

  def index
    user = User.first
    posts = Post.order(created_at: :desc).offset(Integer(params[:page]) * 10).limit(10)
    length = Post.all.length
    render json: post_map_data(posts, length, user), status: :ok
  end

  def wall
    user = User.find_by(username: params[:username])
    # byebug
    posts = user.posts.order(created_at: :desc).offset(Integer(params[:page]) * 10).limit(10)
    length = user.posts.length
    render json: post_map_data(posts, length, user), status: :ok
  end

  def create  
    post = Post.create!(post_params)    
    render json: PostSerializer.new(post).serializable_hash[:data][:attributes], status: :created
  end

  def update
    post = find_post
    post.update!(post_params)
    render json: PostSerializer.new(post).serializable_hash[:data][:attributes], status: :accepted
  end

  def destroy
    post = find_post
    post.destroy
    head :no_content
  end

  private

  def find_post
    Post.find(params[:id])
  end

  def post_map_data(posts, length, user)
    post_map = posts.map { |post|
      PostSerializer.new(post).serializable_hash[:data][:attributes]
    }
    user_name = user.first_name
    data = {posts: post_map, length: length, user_name: user_name}
  end

  def post_params
    params.require(:post).permit(:content, :user_id, :image, :page, :user, :user_avatar, :group_id)
  end

end
