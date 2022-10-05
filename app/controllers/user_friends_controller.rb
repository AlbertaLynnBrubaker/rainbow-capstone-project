class UserFriendsController < ApplicationController
  def create
    user_friend = UserFriend.create!(user_friends_params)
    friend = User.find_by(id: user_friend.friend_id)
    friend_serial = UserSerializer.new(friend).serializable_hash[:data][:attributes]
    data = {friend: friend_serial, user_friend_id: user_friend.id}
    render json: data, status: :created
  end

  def destroy    
    user_friend = UserFriend.find_by(friend_id: params[:id])
    user_friend.destroy
    head :no_content
  end

  private 

  def user_friends_params
    params.require(:user_friend).permit(:id, :logged_user_id, :friend_id)
  end
end
