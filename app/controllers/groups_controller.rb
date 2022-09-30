class GroupsController < ApplicationController
  skip_before_action :authenticate_user, only: :show

  def index
    groups = Group.order(created_at: :desc).offset(Integer(params[:page]) * 10).limit(10)
    length = Group.all.length
    render json: group_map_data(groups, length), status: :ok
  end

  def show
    group_data = Group.find_by(title: params[:title])
    group = GroupSerializer.new(group_data).serializable_hash[:data][:attributes]
    posts_data = group_data.posts
    posts = posts_data.map { |post|
      PostSerializer.new(post).serializable_hash[:data][:attributes]
    }
    data = {posts: posts,group: group}
    render json: data, status: :ok
  end

  private

  def group_map_data(groups, length)
    group_map = groups.map { |group|
      GroupSerializer.new(group).serializable_hash[:data][:attributes]
    }
    data = {groups: group_map, length: length}
  end

  def group_params
    params.require(:group).permit(:title, :founder, :description, :avatar, :avatar_url, :is_private, :page)
  end
end
