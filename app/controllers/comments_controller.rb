class CommentsController < ApplicationController
  skip_before_action :authenticate_user, only: :index

  def index
    comments = Comment.where(post_id: params[:post_id])
    # Post.find(params[:post_id]).comments
    # byebug
    comments_map = comments.map { |comment|
      CommentSerializer.new(comment).serializable_hash[:data][:attributes]
    }
  
    render json: comments_map, status: :ok
  end

  def create    
    comment = Comment.create!(comment_params)
    render json: CommentSerializer.new(comment).serializable_hash[:data][:attributes], status: :created
  end

  def update
    comment = find_comment
    comment.update(comment_params)
    render json: CommentSerializer.new(comment).serializable_hash[:data][:attributes], status: :accepted
  end

  def destroy
    comment = find_comment
    comment.destroy
    head :no_content
  end

  private

  def find_comment
    Comment.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:content, :user_id, :post_id, :comment_image, :page, :user, :user_avatar)
  end
end
