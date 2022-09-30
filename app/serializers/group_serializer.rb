class GroupSerializer
  include JSONAPI::Serializer

  attributes :title, :founder, :description, :is_private, :blurb, :avatar, :avatar_url

  
end
