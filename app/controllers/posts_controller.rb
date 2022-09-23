class PostsController < ApplicationController

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
    render json: PostSerializer.new(post).serializable_hash[:data][:attributes], status: :created
  end

  private

  def post_params
    params.permit(:content, :user_id, :images, :page)
  end

end
