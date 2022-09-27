class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :username, :password_digest, :first_name, :email, :avatar, :avatar_url
end
