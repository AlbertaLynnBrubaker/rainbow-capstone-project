class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :username, :password_digest,:full_name, :first_name, :email, :age, :bio, :avatar, :avatar_url
end
