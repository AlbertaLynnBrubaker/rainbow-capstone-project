class SessionsController < ApplicationController
  skip_before_action :authenticate_user, except: :destroy

  def create  
    user = User.find_by(username: params[:username])
    if(user&.authenticate(params[:password]))
      session[:user_id] = user.id
      groups_data = current_user.groups
      groups = groups_data.map { |group|
        GroupSerializer.new(group).serializable_hash[:data][:attributes]
      }
      friends_data = current_user.friends
      friends = friends_data.map { |friend|
        UserSerializer.new(friend).serializable_hash[:data][:attributes]
      }
      data = { profile: user, groups: groups, friends: friends }
      render json: data, status: :created
    else 
      render json: {errors: ["Not Authorized"] }, status: :unauthorized
    end
  end

  def destroy
      session.delete :user_id
      head :no_content
  end
end
