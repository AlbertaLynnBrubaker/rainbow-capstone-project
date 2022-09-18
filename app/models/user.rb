class User < ApplicationRecord
  has_secure_password

  validates :username, :email, :password, :password_confirmation, presence: true
  validates :password, length: {minimum: 8}
end
