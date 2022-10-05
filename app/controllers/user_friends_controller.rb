class UserFriendsController < ApplicationController
  def create
    
  end

  def destroy
    
  end

  private 

  def user_friends_params
    params.permit(:logged_user_id, :friend_id)
  end
end
