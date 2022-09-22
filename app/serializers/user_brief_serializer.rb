class UserBriefSerializer
  include JSONAPI::Serializer
  attributes :username, :id
end
