class PostsController < ApplicationController

  def index
    # byebug
    posts = Post.offset(Integer(params[:page]) * 10).limit(10)
    data = posts.map { |post|
      PostSerializer.new(post).serializable_hash[:data][:attributes]
    }
    render json: data, status: :ok
  end

  private

  def post_params
    params.permit(:content, :user_id, :page)
  end

end
