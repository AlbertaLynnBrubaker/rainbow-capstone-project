class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :username, :password_digest, :email, :avatar, :avatar_url
end
