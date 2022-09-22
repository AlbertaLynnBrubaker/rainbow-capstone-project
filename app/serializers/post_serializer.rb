class PostSerializer
  include JSONAPI::Serializer

  # belongs_to :user
  # has_many :comments
  attributes :id, :content, :user_id, :comments
  attribute :user, serializer: UserBriefSerializer
end