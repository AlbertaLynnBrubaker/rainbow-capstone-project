class User < ApplicationRecord
  has_secure_password

  has_one_attached :avatar

  validates :username, :email, :password, :password_confirmation, presence: true
  validates :password, length: {minimum: 8}

  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
  end
end
