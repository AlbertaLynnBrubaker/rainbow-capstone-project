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
    user_data = group_data.current_user_in_group?(current_user)
    if(user_data)
      membership_data = group_data.memberships.find_by(user_id: current_user.id)
    end
    posts_data = group_data.posts.order(created_at: :desc).offset(Integer(params[:page]) * 10).limit(10)
    length = group_data.posts.length
    posts = posts_data.map { |post|
      PostSerializer.new(post).serializable_hash[:data][:attributes]
    }
    if(user_data)
      data = {posts: posts, group: group, length: length, user: {is_in_group: user_data}, membership_id: membership_data.id}
    else
      data = {posts: posts, group: group, length: length, user: {is_in_group: user_data} }
    end
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
