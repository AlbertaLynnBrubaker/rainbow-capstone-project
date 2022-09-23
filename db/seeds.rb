puts "shoving 'the gays' back in the closet..."
Comment.destroy_all
Post.destroy_all
User.destroy_all

puts "creating new agents of change..."

admin = User.create(username: "Alie", password: "123", password_confirmation: "123", email: "findingalberta@gmail.com", full_name: "Alie Brubaker", age: 36, bio: "Just a smalltown girl livin in a lonely world", admin: true)

admin.avatar.attach(
  io: File.open(Rails.root.join('avatar_blank.png')), filename: 'avatar_blank.png', content_type: 'image/png')

20.times do 
  u = User.create(username: Faker::Internet.unique.username, password: "123", password_confirmation: "123", email: Faker::Internet.unique.email, full_name: Faker::Name.unique.name, age: Faker::Number.within(range: 13..45), bio: Faker::Hipster.paragraphs(number: 1) )
  puts u.username
  u.avatar.attach(
    io: File.open(Rails.root.join('avatar_blank.png')), filename: 'avatar_blank.png', content_type: 'image/png')
  puts u.avatar_blob.filename
end

puts "spreading the gay agenda..."

50.times do
  Post.create(content: Faker::Hipster.paragraphs(number: 1), user_id: User.all.sample.id)
end

puts "sewing the seeds of the destruction of the Cishet Hegemony..."

120.times do
  Comment.create(content: Faker::Hipster.paragraphs(number: 1), post_id: Post.all.sample.id, user_id: User.all.sample.id)
end

puts "finished creating the Anarco-Syndacalist Gay Paradise we all yearn for!"
