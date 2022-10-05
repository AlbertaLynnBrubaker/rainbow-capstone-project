class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, :background]

  def me
    render json: UserSerializer.new(current_user).serializable_hash[:data][:attributes], status: :ok
  end

  def user_friends
    friends_data = current_user.friends
    friends = friends_data.map { |friend|
      UserSerializer.new(friend).serializable_hash[:data][:attributes]
    }
    render json: friends, status: :ok
  end

  def friends_list    
    if(current_user.friends) 
      friends_data = current_user.friends.order(:full_name).offset(Integer(params[:page]) * 10).limit(10)
      friends = friends_data.map { |friend|
        UserSerializer.new(friend).serializable_hash[:data][:attributes]
      }    
      length = friends_data.length
      data = {friends: friends, length: length}  
      render json: data, status: :ok
    end    
  end

  def background
    bg = User.find_by(username: 'background')
    logo = User.find_by(username: 'logo')
    background_url = {background_url: bg.avatar_url, logo_url: logo.avatar_url}
    render json: background_url, status: :ok
  end

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: UserSerializer.new(user).serializable_hash[:data][:attributes], status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    user = current_user
    user.update!(user_params)
    render json: UserSerializer.new(user).serializable_hash[:data][:attributes], status: :accepted
  end

  def destroy
    current_user.destroy
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :avatar, :password, :password_confirmation, :pronouns, :bio, :age, :full_name, :logged_user_id, :page)
  end
end
