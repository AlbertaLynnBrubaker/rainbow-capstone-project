class GroupsController < ApplicationController
  skip_before_action :authenticate_user, only: :show

  def show
    group_data = Group.find_by(title: params[:title])
    group = GroupSerializer.new(group_data).serializable_hash[:data][:attributes]
    posts_data = group.posts
    posts = posts_data.map { |post|
      PostSerializer.new(post).serializable_hash[:data][:attributes]
    }
    data = {posts, group}
    render json: data, status: :ok
  end

  private

  def group_params
    params.require(:group).permit(:title, :founder, :description, :avatar, :avatar_url, :is_private)
  end
end
