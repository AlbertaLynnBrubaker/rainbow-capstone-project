class GroupSerializer
  include JSONAPI::Serializer

  attributes :title, :founder, :description, :is_private
end
