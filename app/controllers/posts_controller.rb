class PostsController < ApplicationController
  skip_before_action :authenticate_user, only: :index

  def index
    # byebug
    posts = Post.order(created_at: :desc).offset(Integer(params[:page]) * 10).limit(10)
    post_map = posts.map { |post|
      PostSerializer.new(post).serializable_hash[:data][:attributes]
    }
    data = {posts: post_map, length: Post.all.length}
    render json: data, status: :ok
  end

  def create    
    post = Post.create(post_params)
    # byebug
    render json: PostSerializer.new(post).serializable_hash[:data][:attributes], status: :created
  end

  def update
    post = Post.find(params[:id])
    post.update(post_params)
    reder json: PostSerializer.new(post).serializable_hash[:data][:attributes], status: :accepted
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
    head :no_content
  end

  private

  def post_params
    params.require(:post).permit(:content, :user_id, :image, :page, :user, :user_avatar)
  end

end
