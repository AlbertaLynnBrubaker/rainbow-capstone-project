class GroupSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :founder, :description, :is_private, :blurb, :avatar, :avatar_url

  
end
