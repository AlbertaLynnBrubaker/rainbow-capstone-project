class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate_user
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

  private

  def render_not_found not_found
    render json: {errors: not_found.message}, status: :not_foun
  end

  def render_invalid invalid
    render json: {errors: invalid.record.errors.full_messages}
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def authenticate_user
    render json: { errors: {User: "not Authorized"}}, status: :unauthorized unless current_user
  end

  def is_authorized?
    permitted = current_user.admin?
      render json: {errors: {User: "does not have admin permission"}}, status: :forbidden unless permitted
  end
end
